import { createFileRoute } from '@tanstack/react-router'
import Header from '../../components/header'

export const Route = createFileRoute('/_layout/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Header back title="Settings" />
      <h3>Hello "/settings"!</h3>
    </div>
  )
}
