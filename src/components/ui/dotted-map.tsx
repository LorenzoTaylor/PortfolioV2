import * as React from 'react'
import DottedMapLib from 'dotted-map'

export interface MarkerPin {
  x: number  // SVG coordinate (0–119)
  y: number  // SVG coordinate (0–60)
  color?: string
}

interface DottedMapSVGProps {
  markers?: MarkerPin[]
  dotColor?: string
  className?: string
  style?: React.CSSProperties
}

// Pre-generate dots once — expensive, only runs at module load
const mapPoints = (() => {
  const m = new DottedMapLib({ height: 60, grid: 'diagonal' })
  return m.getPoints()
})()

export function DottedMapSVG({ markers = [], dotColor = 'currentColor', className, style }: DottedMapSVGProps) {
  return (
    <svg
      viewBox="0 0 119 60"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: '100%', height: '100%', ...style }}
    >
      {mapPoints.map((point, i) => (
        <circle key={i} cx={point.x} cy={point.y} r={0.22} fill={dotColor} />
      ))}

      {markers.map((m, i) => (
        <g key={`m-${i}`}>
          <circle cx={m.x} cy={m.y} r={0.5} fill="rgba(160,160,160,0.9)" />
          {/* pulse ring */}
          <circle
            cx={m.x} cy={m.y} r={0.5}
            fill="none"
            stroke="rgba(160,160,160,0.7)"
            strokeWidth={0.25}
          >
            <animate attributeName="r" values="0.5;2.2" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0" dur="1.8s" repeatCount="indefinite" />
          </circle>
        </g>
      ))}
    </svg>
  )
}
