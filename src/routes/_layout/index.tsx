import { createFileRoute } from '@tanstack/react-router'
import Header from '../../components/header'

export const Route = createFileRoute('/_layout/')({
  component: Index,
})

function Index() {
  return (
    <div>
      <Header welcome="John Doe" profile/>
      <h3>Welcome Home!</h3>
    </div>
  )
}
