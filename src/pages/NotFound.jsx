import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { asset } from '../lib/asset'

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80vh] flex-col items-center justify-center pt-24 text-center">
      <img src={asset('/images/logo-emblem.svg')} alt="" className="h-24 w-24 animate-float" />
      <p className="mt-8 font-display text-7xl font-extrabold text-ice-100">404</p>
      <h1 className="mt-2 text-3xl font-bold">Page not found</h1>
      <p className="mt-3 text-muted">The page you are looking for does not exist or has moved.</p>
      <Link to="/" className="btn-primary mt-8">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
    </section>
  )
}
