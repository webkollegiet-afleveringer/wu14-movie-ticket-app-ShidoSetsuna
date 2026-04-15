import { createFileRoute } from '@tanstack/react-router'
import { ChevronRight, User, CreditCard, Trash2, Bell, Ticket, LogOut } from 'lucide-react'
import Header from '../../components/header'
import ListItem from '../../components/list-item'
import ProfileIcon from '../../components/profile-icon'

export const Route = createFileRoute('/_layout/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Header back title="Settings" />

      <div className="px-4">

        <button className="flex items-center gap-3 w-full py-4">
          <ProfileIcon />
          <div className="flex-1 text-left">
            <p className="text-text font-semibold">Miles Morales</p>
            <p className="text-text-secondary text-sm">Film Hunter</p>
          </div>
          <ChevronRight size={18} className="text-text-secondary" />
        </button>

        <div className="border-t border-muted my-2" />

        <h2 className="text-text font-bold text-base mt-4 mb-2">Account</h2>
        <ListItem
          icon={<User size={18} className="text-white" />}
          label="Personal Data"
          iconBg="bg-blue-400"
        />
        <ListItem
          icon={<CreditCard size={18} className="text-white" />}
          label="Email & Payment"
          iconBg="bg-cyan-500"
        />
        <ListItem
          icon={<Trash2 size={18} className="text-white" />}
          label="Deactivate Account"
          iconBg="bg-warn"
        />

        <div className="border-t border-muted my-2" />

        <h2 className="text-text font-bold text-base mt-4 mb-2">Privacy & Policy</h2>
        <ListItem
          icon={<Bell size={18} className="text-white" />}
          label="Notification"
          iconBg="bg-blue-400"
        />
        <ListItem
          icon={<Ticket size={18} className="text-white" />}
          label="Your Ticket"
          iconBg="bg-cyan-400"
        />
        <ListItem
          icon={<LogOut size={18} className="text-white" />}
          label="Logout"
          iconBg="bg-warn"
        />

      </div>
    </div>
  )
}
