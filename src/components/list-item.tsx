import { ChevronRight } from 'lucide-react'

interface ListItemProps {
  icon: React.ReactNode
  label: string
  iconBg?: string
  onClick?: () => void
}

const ListItem: React.FC<ListItemProps> = ({ icon, label, iconBg = 'bg-accent', onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 w-full py-3"
    >
      <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <span className="text-text font-medium flex-1 text-left">{label}</span>
      <ChevronRight size={18} className="text-text-secondary" />
    </button>
  )
}

export default ListItem
