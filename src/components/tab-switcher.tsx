interface Tab {
  label: string
  value: string
}

interface TabSwitcherProps {
  tabs: Tab[]
  active: string
  onChange: (value: string) => void
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ tabs, active, onChange }) => {
  return (
    <div className="flex gap-2 mx-4 my-3 bg-muted p-2 rounded-lg">
      {tabs.map(tab => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
            active === tab.value
              ? 'bg-accent text-white'
              : 'text-text-secondary'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default TabSwitcher
