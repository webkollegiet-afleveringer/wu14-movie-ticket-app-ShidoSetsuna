import { createFileRoute, Outlet } from '@tanstack/react-router'
import Nav from '../components/nav'

const Layout: React.FC = () => {
  return (
    <>
      <div className="pb-16">
        <Outlet />
      </div>
      <Nav />
    </>
  )
}

export const Route = createFileRoute('/_layout')({
  component: Layout,
})
