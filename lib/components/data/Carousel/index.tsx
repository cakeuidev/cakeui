import React, { use, useEffect, useMemo, useRef } from 'react'
import { cls } from '../../../utils/index.js'
import { useEventListener, useFirstRender, useTimeout } from '../../../hooks/index.js'
import { useComponentRef, useStateListner } from '../../tools'
import Icon from '../../general/Icon'

export type CarouselProps = React.JSX.IntrinsicElements['div'] & {
  activeKey?: string
  onChangeActiveKey?: (key: string) => any
  infinite?: boolean     // default: false
  arrows?: boolean       // default: false
  dots?: boolean         // default: true
  draggable?: boolean    // default: false
  autoplay?: boolean     // default: false
  autoplayDelay?: number // default: 3000
}
export type CarouselItemProps = React.JSX.IntrinsicElements['div'] & {
  itemKey?: string
}

const CarouselContext = React.createContext<{
  activeKey: any
  itemEl: React.RefObject<{ [k: string]: HTMLDivElement | null }>
} | null>(null)

function Carousel(props: CarouselProps) {
  const {
    activeKey: propsActiveKey,
    onChangeActiveKey,
    infinite = false,
    arrows = false,
    dots = true,
    draggable = false,
    autoplay = false,
    autoplayDelay = 3000,
    ...rest
  } = props

  const [keys, Children] = useMemo(() => {
    const keys: any[] = []
    React.Children.forEach(rest.children, (x: any) => {
      if (x?.type === CarouselItem) {
        keys.push(x.key ?? String(keys.length + 1))
      }
    })
    const k = [...keys]
    const Children = React.Children.map(rest.children, (x: any) => {
      if (x?.type === CarouselItem) {
        return React.cloneElement(x, { ...x.props, itemKey: k.shift() })
      }
      return x
    })
    return [keys, Children]
  }, [rest.children])

  const firstRender = useFirstRender()
  const groupEl = useRef<HTMLDivElement>(null)
  const itemEl = useRef<{ [k: string]: HTMLDivElement | null }>({})
  const dragRef = useRef<{ initKey: string, initX: number, startX: number, scrollLeft: number }>(null)
  const [activeKey, setActiveKey] = useStateListner(propsActiveKey, onChangeActiveKey, keys[0])

  const activeIndex = useMemo(() => {
    return keys.indexOf(activeKey)
  }, [keys, activeKey])

  useEffect(() => {
    const el = itemEl.current[activeKey as string]
    if (!el || dragRef.current) {
      return
    }
    beforeScroll(el, !firstRender)
    el.scrollIntoView({ behavior: firstRender ? 'instant' : 'smooth', inline: 'center' })
    afterScroll(el)
  }, [activeKey])
  useEffect(() => {
    if (keys.length && activeIndex === -1) {
      setActiveKey(keys[0])
    }
  }, [activeIndex])

  const playNext = (n: number) => {
    let index = activeIndex + n
    if (index < 0) {
      index = keys.length - 1
    } else if (index > keys.length - 1) {
      index = 0
    }
    setActiveKey(keys[index])
  }
  const beforeScroll = (el: HTMLElement, clone?: boolean) => {
    if (!infinite || !groupEl.current) {
      return
    }
    timeout.stop()
    removeClone()
    const els = groupEl.current.querySelectorAll('.ui-carousel-item')
    const before = [...els].indexOf(el)
    const after = els.length - before - 1
    const diff = Math.floor(Math.abs(before - after))
    for (let i = 0; i < diff / 2; i++) {
      const el = before > after ? els[i] : els[els.length - 1 - i]
      if (clone) {
        const clone = el.cloneNode(true) as HTMLElement
        clone.classList.add('ui-carousel-clone')
        groupEl.current.insertBefore(clone, el)
      }
      if (before > after) {
        groupEl.current.append(el)
      } else {
        groupEl.current.prepend(el)
      }
    }
  }
  const afterScroll = (el: HTMLElement, callback?: () => any) => {
    const center = document.createElement('span')
    center.classList.add('ui-carousel-center')
    el.append(center)
    const ovserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback?.()
        setTimeout(removeClone, 100)
        setDragStyle(false)
        if (autoplay) {
          timeout.start()
        }
        center.remove()
        ovserver.disconnect()
      }
    }, {
      root: groupEl.current,
      rootMargin: '0px -50% 0px -50%'
    })
    ovserver.observe(center)
  }
  const removeClone = () => {
    groupEl.current?.querySelectorAll('.ui-carousel-clone').forEach((el) => el.remove())
  }
  const setDragStyle = (drag: boolean) => {
    if (!groupEl.current) {
      return
    }
    if (!drag && groupEl.current.parentElement) {
      groupEl.current.parentElement.style.cursor = ''
    }
    groupEl.current.style.pointerEvents = drag ? 'none' : ''
    groupEl.current.style.userSelect = drag ? 'none' : ''
    groupEl.current.style.scrollSnapType = drag ? 'none' : ''
    for (let el of Object.values(itemEl.current)) {
      if (el) {
        el.style.scrollSnapAlign = drag ? 'none' : ''
      }
    }
  }

  useEventListener('pointermove', (e) => {
    if (!dragRef.current || !groupEl.current) {
      return
    }
    setDragStyle(true)
    const event = e as MouseEvent
    const { startX, scrollLeft } = dragRef.current
    const offset = event.clientX - startX
    groupEl.current.scrollLeft = scrollLeft - offset
    const p = groupEl.current.getBoundingClientRect()
    if (infinite) {
      const els = groupEl.current.querySelectorAll<HTMLElement>('.ui-carousel-item')
      const appends = []
      const prepends = []
      for (let i = 0; i < els.length; i++) {
        const rect = els[i].getBoundingClientRect()
        if (rect.right <= p.left) {
          appends.push(els[i])
        } else if (rect.left >= p.right) {
          prepends.push(els[i])
        }
      }
      if (offset < 0 && appends.length) {
        let offset = 0
        const prevFirstRect = appends[0]?.getBoundingClientRect()
        const currFirstRect = appends[appends.length - 1].nextElementSibling?.getBoundingClientRect()
        if (prevFirstRect && currFirstRect) {
          offset = prevFirstRect.left - currFirstRect.left
        }
        groupEl.current.append(...appends)
        groupEl.current.scrollLeft += offset
        dragRef.current.scrollLeft = groupEl.current.scrollLeft
        dragRef.current.startX = event.clientX
      }
      if (offset > 0 && prepends.length) {
        let offset = 0
        const prevLastRect = prepends[prepends.length - 1]?.getBoundingClientRect()
        const currLastRect = prepends[0].previousElementSibling?.getBoundingClientRect()
        if (prevLastRect && currLastRect) {
          offset = prevLastRect.right - currLastRect.right
        }
        groupEl.current.prepend(...prepends)
        groupEl.current.scrollLeft += offset
        dragRef.current.scrollLeft = groupEl.current.scrollLeft
        dragRef.current.startX = event.clientX
      }
    }
    const c = p.left + p.width / 2
    let min = Infinity
    let activekey = ''
    for (let [key, el] of Object.entries(itemEl.current)) {
      if (el) {
        const rect = el.getBoundingClientRect()
        const offset = Math.abs(rect.left + rect.width / 2 - c)
        if (offset < min) {
          min = offset
          activekey = key
        }
      }
    }
    if (activekey) {
      setActiveKey(activekey)
    }
  }, void 0, true)
  useEventListener('pointerup', (e) => {
    if (!dragRef.current || !groupEl.current) {
      return
    }
    const { initKey, initX } = dragRef.current
    let index = activeIndex
    if (activeKey === initKey) {
      const event = e as MouseEvent
      const offset = event.clientX - initX
      if (offset <= -20) {
        index = activeIndex + 1
        if (infinite && index > keys.length - 1) {
          index = 0
        }
      } else if (offset >= 20) {
        index = activeIndex - 1
        if (infinite && index < 0) {
          index = keys.length - 1
        }
      }
    }
    if (index < 0 || index > keys.length - 1) {
      index = activeIndex
    }
    const el = itemEl.current[keys[index]]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'center' })
      afterScroll(el, () => {
        beforeScroll(el)
        el.scrollIntoView({ behavior: 'instant', inline: 'center' })
        setActiveKey(keys[index])
      })
    }
    dragRef.current = null
  }, void 0, true)
  useEventListener('pointercancel', () => {
    setDragStyle(false)
    dragRef.current = null
  }, void 0, true)

  const timeout = useTimeout(() => playNext(1), autoplayDelay)
  useEffect(() => {
    autoplay ? timeout.start() : timeout.stop()
  }, [autoplay])

  return (
    <div
      {...rest}
      className={cls('ui-carousel', rest.className)}
    >
      <div className='ui-carousel-body'>
        {arrows && (
          <Icon
            size={24}
            className={cls('ui-carousel-icon', {
              'ui-disabled': !infinite && activeIndex === 0
            })}
            onClick={() => playNext(-1)}
          >
            keyboard_arrow_left
          </Icon>
        )}
        <div
          ref={groupEl}
          className='ui-carousel-group'
          onPointerDown={(e) => {
            if (!draggable || !groupEl.current || !activeKey) {
              return
            }
            if (groupEl.current.parentElement) {
              groupEl.current.parentElement.style.cursor = 'grabbing'
            }
            dragRef.current = {
              initKey: activeKey,
              initX: e.clientX,
              startX: e.clientX,
              scrollLeft: groupEl.current.scrollLeft
            }
          }}
        >
          <CarouselContext.Provider value={{ activeKey, itemEl }}>
            {Children}
          </CarouselContext.Provider>
        </div>
       {arrows && (
          <Icon
            size={24}
            className={cls('ui-carousel-icon', {
              'ui-disabled': !infinite && activeIndex === keys.length - 1
            })}
            onClick={() => playNext(1)}
          >
            keyboard_arrow_right
          </Icon>
        )}
      </div>
      {dots && (
        <div className='ui-carousel-dots'>
          {keys.map((key) => (
            <span
              key={key}
              className={cls({
                'ui-carousel-active': key === activeKey
              })}
              onClick={() => setActiveKey(key)}
            ></span>
          ))}
        </div>
      )}
    </div>
  )
}

function CarouselItem(props: CarouselItemProps) {
  const {
    itemKey,
    ...rest
  } = props

  const { activeKey, itemEl } = use(CarouselContext)!
  const [, ref] = useComponentRef(rest.ref)

  return (
    <div
      {...rest}
      className={cls('ui-carousel-item', {
        'ui-carousel-active': itemKey === activeKey
      }, rest.className)}
      ref={(el) => {
        ref(el)
        itemEl.current[itemKey as string] = el
      }}
    >
      {rest.children}
    </div>
  )
}

Carousel.Item = CarouselItem

export default Carousel
