import { createFileRoute } from '@tanstack/react-router'
import Header from '../../components/header'

export const Route = createFileRoute('/_layout/explore')({
  component: Explore,
})

function Explore() {
  return (
    <div>
      <Header back title="Explore Movies" search />
      <h3>Hello from Explore!</h3>
    </div>
  )
}
