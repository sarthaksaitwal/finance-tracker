import { motion } from 'framer-motion'

const variants = {
  ghost: 'bg-transparent hover:bg-white/5 text-slate-300 hover:text-white border border-transparent hover:border-white/10',
  icon:  'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/[0.07] rounded-xl',
}

export default function Button({
  children,
  variant = 'ghost',
  onClick,
  className = '',
  title,
  'aria-label': ariaLabel,
}) {
  return (
    <motion.button
      onClick={onClick}
      title={title}
      aria-label={ariaLabel}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`
        flex items-center justify-center gap-2
        text-sm font-medium rounded-xl
        transition-colors duration-150
        cursor-pointer select-none
        ${variants[variant] ?? ''}
        ${className}
      `}
    >
      {children}
    </motion.button>
  )
}
