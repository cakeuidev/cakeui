import { Snowflake } from './snowflake'

export function cls(
  ...args: (undefined | string | string[] | { [k: string]: any })[]
): string | undefined {
  const classList = []
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (typeof arg === 'string') {
      classList.push(arg)
    } else if (Array.isArray(arg)) {
      classList.push(cls(...arg))
    } else if (arg && typeof arg === 'object') {
      for (let [k, v] of Object.entries(arg)) {
        if (v) {
          classList.push(k)
        }
      }
    }
  }
  return classList.join(' ').replace(/\s+/g, ' ').trim() || void 0
}

const snowflake = new Snowflake({ epoch: new Date('2025').getTime() })
export function uid(): string {
  return snowflake.generate().toString().padStart(19, '0')
}

export function delay(delay: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delay))
}

export function throttle<T extends (...args: Parameters<T>) => any>(
  fn: T,
  delay?: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null
  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      timer = null
    }, delay)
    fn.apply(this, args)
  }
}

export function debounce<T extends (...args: Parameters<T>) => any>(
  fn: T,
  delay?: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null
  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
