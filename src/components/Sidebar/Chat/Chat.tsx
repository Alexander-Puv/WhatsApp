import getMessageTime from '../../../utils/getMessageTime'
import UserIcon from '../../UI/UserIcon'
import cl from './Chat.module.css'

export interface ChatProps {
  title: string,
  date: Date,
  lastMessage: string,
}

const Chat = ({title, date, lastMessage}: ChatProps) => {
  const time = getMessageTime(date)
  
  return (
    <div className={cl.chat}>
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

export default Chat