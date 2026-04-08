import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/explore')({
  component: Explore,
})

function Explore() {
  return <div className="p-2">Hello from Explore!</div>
}
