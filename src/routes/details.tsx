import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/details')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/details"!</div>
}
