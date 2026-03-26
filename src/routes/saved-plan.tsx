import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/saved-plan')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/saved-plan"!</div>
}
