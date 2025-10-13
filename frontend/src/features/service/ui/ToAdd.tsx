import NavButton from '@/shared/components/navButton/NavButton.tsx'

const ToAdd = () => {
  return (
    <div className='card-element w-1/3 center mx-auto flex-col gap-3 h-52'>
      <h3 className='color-font text-2xl font-semibold center-inline'>Добавьте первую услугу</h3>

      <NavButton label='Создать' to='/add' className='button w-fit' />
    </div>
  )
}

export default ToAdd
