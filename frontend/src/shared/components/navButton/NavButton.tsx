import { useNavigate } from 'react-router-dom'
import type { NavButtonProps } from '@/shared/components/navButton/navButtonProps.ts'

function NavButton(props: NavButtonProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (props.to === 'back') {
      navigate(-1)
    } else {
      let resolvedPath: string = props.to
      if ('params' in props && props.params) {
        resolvedPath = props.to.replace(':username', props.params)
      }
      navigate(resolvedPath)
    }
  }

  return (
    <a onClick={handleClick} className={props.className}>
      {props.label}
    </a>
  )
}

export default NavButton
