import { Cog, Factory, Lightbulb, RefreshCcw, Wrench } from 'lucide-react'

const icons = { Cog, Factory, Lightbulb, RefreshCcw, Wrench }

export default function Icon({ name, ...props }) {
  const C = icons[name] ?? Cog
  return <C {...props} />
}
