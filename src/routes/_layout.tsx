import { createFileRoute, Outlet } from '@tanstack/react-router'
import Nav from '../components/nav'

const Layout: React.FC = () => {
  return (
    <>
      <Outlet />
      <Nav />
    </>
  )
}

export const Route = createFileRoute('/_layout')({
  component: Layout,
})
