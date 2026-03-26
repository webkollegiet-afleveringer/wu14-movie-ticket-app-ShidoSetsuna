import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/checkout_flow')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/checkout_flow"!</div>
}
