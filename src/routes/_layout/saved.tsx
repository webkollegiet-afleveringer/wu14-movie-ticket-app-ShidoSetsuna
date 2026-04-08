import { createFileRoute } from '@tanstack/react-router'
import Header from '../../components/header'

export const Route = createFileRoute('/_layout/saved')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Header back title="Saved Plan" />
      <h3>Hello "/saved"!</h3>
    </div>
  )
}
