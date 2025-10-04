import { ROUTES } from '@/shared/const/routes.ts'
import { Link } from 'react-router-dom'

const ViewProfileButton = ({ username }: { username: string }) => {
  return (
    <Link className='button h-10 flex items-center' to={ROUTES.PROFILE + `/${username}`}>
      Просмотреть профиль
    </Link>
  )
}

export default ViewProfileButton
