import { Link } from '@tanstack/react-router'

interface ButtonProps {
  title: string
  onClick?: () => void
  to?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  variant?: 'primary' | 'outline' | 'danger'
  className?: string
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  to,
  icon,
  iconPosition = 'left',
  variant = 'primary',
  className = '',
  disabled = false,
}) => {
  const base = 'flex items-center justify-center gap-2 py-4 px-4 rounded-2xl font-semibold transition-colors'

  const variants = {
    primary: 'bg-accent text-white',
    outline: 'border border-accent text-accent bg-transparent',
    danger:  'border border-warn text-warn bg-transparent',
  }

  const classes = `${base} ${variants[variant]} ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`

  const content = (
    <>
      {icon && iconPosition === 'left' && icon}
      {title && <span>{title}</span>}
      {icon && iconPosition === 'right' && icon}
    </>
  )

  if (to) {
    return <Link to={to} className={classes}>{content}</Link>
  }

  return (
    <button onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  )
}

export default Button
