interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: number | string
  height?: number | string
  animation?: 'pulse' | 'wave' | 'none'
}

export const Skeleton = ({
  className,
  variant = 'text',
  width,
  height,
  animation = 'pulse',
}: SkeletonProps) => {
  const baseClasses = `
  bg-gray-200 rounded-md
  ${variant === 'circular' ? 'rounded-full' : ''}
  ${variant === 'rectangular' ? 'rounded-none' : ''}
  ${animation === 'pulse' ? 'animate-pulse' : ''}
  ${animation === 'wave' ? 'relative overflow-hidden' : ''}
  ${className || ''}
`
    .replace(/\s+/g, ' ')
    .trim()

  const waveEffect = animation === 'wave' && (
    <div className='absolute inset-0 -translate-x-full animate-[wave_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent' />
  )

  return (
    <div className={baseClasses} style={{ width, height }}>
      {waveEffect}
    </div>
  )
}
