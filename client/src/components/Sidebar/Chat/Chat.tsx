import { useContext } from 'react'
import { ChatContext } from '../../../context/ChatContext/ChatContext'
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
  const context = useContext(ChatContext)
  const time = getMessageTime(date)
  
  return (
    <div onClick={() => context?.setId(id)}
      className={cl.chat + ' ' + (context?.id === id ? cl.chatChosen : '')}>
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