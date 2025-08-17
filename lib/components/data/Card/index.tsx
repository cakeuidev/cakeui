import { cls } from '../../../utils'

export type CardProps = React.ComponentPropsWithRef<'div'>
export type CardTitleProps = React.ComponentPropsWithRef<'div'>
export type CardContentProps = React.ComponentPropsWithRef<'div'>
export type CardFooterProps = React.ComponentPropsWithRef<'div'>

function Card(props: CardProps) {
  return (
    <div
      {...props}
      className={cls('ui-card', props.className)}
    >
      {props.children}
    </div>
  )
}

function CardTitle(props: CardTitleProps) {
  return (
    <div
      {...props}
      className={cls('ui-card-title', props.className)}
    >
      {props.children}
    </div>
  )
}

function CardContent(props: CardContentProps) {
  return (
    <div
      {...props}
      className={cls('ui-card-content', props.className)}
    >
      {props.children}
    </div>
  )
}

function CardFooter(props: CardFooterProps) {
  return (
    <div
      {...props}
      className={cls('ui-card-footer', props.className)}
    >
      {props.children}
    </div>
  )
}

Card.Title = CardTitle
Card.Content = CardContent
Card.Footer = CardFooter

export default Card
