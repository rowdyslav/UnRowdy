import { useCallback, useEffect, useRef, useState } from 'react'
import type { SelectProps } from '@/entities/categories/ui/selectCategory/selectCategoryProps.ts'
import { useController, useFormContext } from 'react-hook-form'

const SelectCategory = ({ data, name }: SelectProps) => {
  const { control } = useFormContext()
  const { field } = useController({ name, control })

  const [open, setOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (!selectRef.current?.contains(event.target as Node)) {
      setOpen(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [handleClickOutside])

  const handleSelect = (_id: string) => {
    field.onChange(_id)
    setOpen(false)
  }

  const selectedCategory = data.find(cat => cat._id === field.value)

  return (
    <div className='relative' ref={selectRef}>
      <div
        className='rounded-lg border border-gray-200 cursor-pointer py-1 px-2 flex justify-between mb-1'
        onClick={() => setOpen(o => !o)}
        tabIndex={0}
      >
        <p className=' text-sm'>{selectedCategory?.name || 'Не выбрано'}</p>
        <img
          src='/icons/arrows/arrowDown.svg'
          alt=''
          className={`transition duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </div>

      {open && data.length !== 0 && (
        <ul className='rounded-lg border border-gray-200 bg-white w-full p-1 grid gap-1 z-10 absolute'>
          {data.map(({ name, _id }) => (
            <li
              key={name}
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && field.onChange(name)}
              className={`pl-3 p-1 rounded-sm cursor-pointer text-sm color-font-light
                ${field.value === _id ? 'bg-blue-100 text-blue-500' : 'hover:bg-gray-100'}`}
              onClick={() => handleSelect(_id)}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SelectCategory
