import { createFileRoute } from '@tanstack/react-router'
import Header from '../../components/header'
import SearchTool from '../../components/search'

export const Route = createFileRoute('/_layout/')({
  component: Index,
})

function Index() {
  return (
    <div>
      <Header welcome="John Doe" profile/>
      <SearchTool open={true} onToggle={() => {}} />
      <h3>Welcome Home!</h3>
    </div>
  )
}
