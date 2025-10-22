import * as React from 'react'

interface FieldProps {
  label?: string
  error?: string | null
  children: React.ReactNode
}

const Field = ({ label, error, children }: FieldProps) => (
  <div className='add-flex'>
    <label className='text-lg font-bold color-font-light'>
      {label}
      {children}
    </label>
    {error && <p className='text-center text-red-400'>{error}</p>}
  </div>
)

export default Field
