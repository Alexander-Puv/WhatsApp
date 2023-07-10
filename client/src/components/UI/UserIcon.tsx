import { ButtonHTMLAttributes } from 'react'
import { AiOutlineUser } from 'react-icons/ai'

const UserIcon = (props?: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={'user-icon svg-parent ' + props?.className} {...props}>
      <AiOutlineUser />
    </button>
  )
}

export default UserIcon