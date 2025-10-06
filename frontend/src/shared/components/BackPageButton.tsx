import { useNavigate } from 'react-router-dom'

const BackPageButton = () => {
  const navigate = useNavigate()

  return (
    <button onClick={() => navigate(-1)} className='button'>
      Отмена
    </button>
  )
}

export default BackPageButton
