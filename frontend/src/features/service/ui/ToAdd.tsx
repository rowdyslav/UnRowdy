import NavButton from '@/shared/components/navButton/NavButton.tsx'

const ToAdd = () => {
  return (
    <div className='card-element center flex-col mx-auto my-auto gap-3 h-min-52 p-3'>
      <h3 className='color-font text-2xl font-semibold center-inline'>Добавьте услугу</h3>

      <NavButton label='Создать' to='/add' className='button w-fit' />
    </div>
  )
}

export default ToAdd
