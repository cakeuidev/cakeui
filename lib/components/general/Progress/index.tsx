import { cls } from '../../../utils'

export type ProgressProps = React.ComponentPropsWithRef<'svg'> & {
  size?: number        // default: 100
  strokeWidth?: number // default: 8
  value?: number       // default: 0
  color?: string       // default: '#000000'
  text?: string
}

function Progress(props: ProgressProps) {
  const {
    size = 100,
    strokeWidth = 8,
    value = 0,
    color = '#000000',
    text
  } = props

  const center = size / 2
  const radius = center - strokeWidth / 2
  const circumference = 2 * Math.PI * radius

  return (
    <svg
      {...props}
      className={cls('ui-progress', props.className)}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <circle
        fill='transparent'
        stroke='#e5e7eb'
        strokeWidth={strokeWidth}
        cx={center}
        cy={center}
        r={radius}
      />
      <circle
        fill='transparent'
        stroke={color}
        strokeWidth={strokeWidth}
        cx={center}
        cy={center}
        r={radius}
        strokeDasharray={circumference}
        strokeDashoffset={circumference - (value / 100) * circumference}
        style={{
          transition: 'stroke-dashoffset 0.3s ease',
          transform: 'rotate(-90deg)',
          transformOrigin: '50% 50%'
        }}
      />
      <text
        x='50%'
        y='50%'
        textAnchor='middle'
        dominantBaseline='middle'
        style={{
          fill: color,
          fontSize: size / 5
        }}
      >
        {text ?? `${value}%`}
      </text>
    </svg>
  )
}

export default Progress
