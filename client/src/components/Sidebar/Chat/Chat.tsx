import { observer } from 'mobx-react-lite'
import ChatStore from '../../../store/ChatStore'
import getMessageTime from '../../../utils/getMessageTime'
import UserIcon from '../../UI/UserIcon'
import cl from './Chat.module.css'

export interface ChatProps {
  id: string,
  title: string,
  date: Date,
  lastMessage: string,
  // photo: string
}

const Chat = ({id, title, date, lastMessage}: ChatProps) => {
  const time = getMessageTime(date)
  
  return (
    <div onClick={() => ChatStore.setId(id)}
      className={cl.chat + ' ' + (ChatStore.id === id ? cl.chatChosen : '')}>
      <div className={cl.chat__left}>
        <UserIcon />
      </div>
      <div className={cl.chat__right}>
        <div className={cl.chat__main}>
          <div className={cl.chat__title}>
            <span>{title}</span>
          </div>
          <div className={cl.chat__time}>{time}</div>
        </div>
        <div className={cl.chat__lastMessage}>
          <span>{lastMessage}</span>
        </div>
      </div>
    </div>
  )
}

export default observer(Chat)