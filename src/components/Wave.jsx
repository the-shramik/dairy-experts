// Layered, slowly drifting milk waves (brand motif taken from the brochure).
const tile = 'M0,40 C360,90 1080,-10 1440,40 L1440,120 L0,120 Z'

function Layer({ className, fill, opacity = 1, offset = 0 }) {
  return (
    <svg
      className={`absolute inset-x-0 bottom-0 h-full w-[200%] ${className}`}
      viewBox="0 0 2880 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ transform: `translateY(${offset}px)` }}
    >
      <path d={tile} fill={fill} opacity={opacity} />
      <path d={tile} transform="translate(1440 0)" fill={fill} opacity={opacity} />
    </svg>
  )
}

export default function Wave({ color = '#ffffff', className = '', flip = false }) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 h-16 overflow-hidden sm:h-24 ${flip ? 'top-0 rotate-180' : 'bottom-0'} ${className}`}
    >
      <div className="absolute inset-0 animate-wave-slow">
        <Layer fill="#7cc4e2" opacity={0.35} offset={-14} />
      </div>
      <div className="absolute inset-0 animate-wave [animation-direction:reverse]">
        <Layer fill="#3a93c3" opacity={0.3} offset={-6} />
      </div>
      <div className="absolute inset-0 animate-wave">
        <Layer fill={color} />
      </div>
    </div>
  )
}
