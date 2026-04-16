import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/checkout_flow')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
