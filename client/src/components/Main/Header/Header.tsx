import { AiOutlineSearch } from 'react-icons/ai'
import { GoKebabVertical } from 'react-icons/go'
import ChatStore from '../../../store/ChatStore'
import UserIcon from '../../UI/UserIcon'
import cl from './Header.module.scss'

const Header = () => {
  const chat = ChatStore.currentChat
  const member = ChatStore.member
  
  if (!chat) return <></> // chat cannot be null here
  const headerImg = (chat.isGroup && chat?.photo) || member?.photo
  
  return (
    <header className={`${cl.header} header`}>
      <div className={cl.header__left}>
        {headerImg ?
          <div className={cl.header__img} style={{backgroundImage: `url(${headerImg})`}} />
          // <img src={(chat.isGroup && chat?.photo) || member?.photo} />
        :
          <UserIcon />
        }
        {chat.isGroup ? chat.name : member?.username}
      </div>
      <div className={cl.header__right}>
        <div className="svg-parent svg-parent_active">
          <AiOutlineSearch />
        </div>
        <div className="svg-parent svg-parent_active">
          <GoKebabVertical />
        </div>
      </div>
    </header>
  )
}

export default Header