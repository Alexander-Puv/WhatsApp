import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import AppStore from '../../../store/AppStore'
import ChatStore from '../../../store/ChatStore'
import IChat from '../../../types/chat'
import getMessageTime from '../../../utils/getMessageTime'
import UserIcon from '../../UI/UserIcon'
import cl from './Chat.module.css'
import IUser from '../../../types/user'

interface ChatProps {
  chatId: string,
  chatData?: IChat
}

const Chat = ({chatId, chatData}: ChatProps) => {
  const [chat, setChat] = useState<IChat | null>(chatData ? chatData : null)
  const [member, setMember] = useState<IUser | null>(null)
  
  const appStoreUser = toJS(AppStore.user)

  useEffect(() => {
    const findMember = async (chat: IChat) => {
      setMember(await ChatStore.findUserById(
        chat.members[0] !== appStoreUser.uid
        ? chat.members[0]
        : chat.members[1]
      ))
    }

    const findChat = async () => {
      const chat = await ChatStore.findChatById(chatId)
      setChat(chat)
      await findMember(chat)
    }
    
    !chatData && findChat()
    chatData && !chatData.isGroup && findMember(chatData)
  }, [])

  if (!chat) return <></>

  const time = getMessageTime(new Date(chat.createdAt))
  const photo = chat.isGroup ? chat.photo : member?.photo
  const title = chat.isGroup ? chat.name : member?.username
  
  return (
    <div onClick={() => ChatStore.setId(chatId)}
      className={cl.chat + ' ' + (ChatStore.id === chatId ? cl.chatChosen : '')}>
      <div className={cl.chat__left}>
        {/* {photo ?

        : */}
          <UserIcon />
        {/* } */}
      </div>
      <div className={cl.chat__right}>
        <div className={cl.chat__main}>
          <div className={cl.chat__title}>
            <span>{title}</span>
          </div>
          <div className={cl.chat__time}>{time}</div>
        </div>
        <div className={cl.chat__lastMessage}>
          <span>{chat.messages[chat.messages.length - 1]?.content || 'No messages here'}</span>
        </div>
      </div>
    </div>
  )
}

export default observer(Chat)