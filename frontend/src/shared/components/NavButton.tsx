import { useNavigate } from 'react-router-dom'

const NavButton = ({to}: {to: string | -1}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (typeof to === 'string') {
      navigate(to)
    } else {
      navigate(-1)
    }
  }

  return (
    <button onClick={handleClick} className='button'>
      Отмена
    </button>
  )
}

export default NavButton
