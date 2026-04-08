import { createFileRoute } from '@tanstack/react-router'
import Header from '../../components/header'

export const Route = createFileRoute('/details/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Header back title="Movie Details" bookmark/>
      <h3>Hello "/details"!</h3>
    </div>
  )
}
