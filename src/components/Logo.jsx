import { Link } from 'react-router-dom'
import { asset } from '../lib/asset'

export default function Logo({ light = false, className = '' }) {
  return (
    <Link to="/" aria-label="The Dairy Experts home" className={`group flex items-center gap-2.5 ${className}`}>
      <img
        src={asset('/images/logo-emblem.svg')}
        alt=""
        width="48"
        height="48"
        className="h-11 w-11 shrink-0 transition-transform duration-500 group-hover:rotate-[-6deg] sm:h-12 sm:w-12"
      />
      <img
        src={light ? asset('/images/logo-wordmark-white.svg') : asset('/images/logo-wordmark.svg')}
        alt="The Dairy Experts (India) Pvt. Ltd."
        width="304"
        height="59"
        className="h-8 w-auto sm:h-9"
      />
    </Link>
  )
}
