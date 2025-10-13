import * as React from 'react'

const Field = ({
  label,
  error,
  children,
}: {
  label?: string
  error?: string | null
  children: React.ReactNode
}) => (
  <div className='add-flex'>
    <h3 className='text-lg font-bold color-font-light'>{label}</h3>
    {children}
    {error && <p className='text-center text-red-400'>{error}</p>}
  </div>
)

export default Field
