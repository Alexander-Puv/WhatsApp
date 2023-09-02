import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import AppStore from '../../../store/AppStore'
import ChatStore from '../../../store/ChatStore'
import IChat from '../../../types/chat'
import IUser from '../../../types/user'
import { getSidebarMessageTime } from '../../../utils/getDate'
import UserIcon from '../../UI/UserIcon'
import cl from './Chat.module.scss'
import IMsg from '../../../types/message'

interface ChatProps {
  chatId: string,
  chatData?: IChat
}

const Chat = ({chatId, chatData}: ChatProps) => {
  const [chat, setChat] = useState<IChat | null>(chatData ? chatData : null)
  const [member, setMember] = useState<IUser | null>(null)
  const [lastMsg, setLastMsg] = useState<IMsg | null>(null)
  
  const user = AppStore.user

  useEffect(() => {
    const findMember = async (chat: IChat) => {
      setMember(await ChatStore.findUserById(
        chat.members[0] !== user.uid
        ? chat.members[0]
        : chat.members[1]
      ))
    }

    const findChat = async () => {
      const chat = await ChatStore.findChatById(chatId)
      setChat(chat)
      await findMember(chat)

      const lastMsg = chat.messages[chat.messages.length - 1]
      setLastMsg(typeof lastMsg === 'string' ? await ChatStore.findMsgById(lastMsg) : lastMsg)
    }
    
    !chatData && findChat()
    chatData && !chatData.isGroup && findMember(chatData)
  }, [])

  if (!chat) return <></>

  const time = getSidebarMessageTime(new Date(lastMsg ? lastMsg.createdAt : chat.createdAt))
  const photo = chat.isGroup ? chat.photo : member?.photo
  const title = chat.isGroup ? chat.name : member?.username

  const clickHandler = () => {
    ChatStore.setCurrentChat(chat)
    ChatStore.setMember(member)

    chat.messages.slice().reverse().map((msg, i) =>
      // we upload only first 25 messages when a user chooses a chat
      i !== 25 && typeof msg == 'string'
        && ChatStore.findMsgById(msg)
    )
  }
  
  return (
    <div onClick={clickHandler}
      className={cl.chat + ' ' + (ChatStore.currentChat?.id === chatId ? cl.chatChosen : '')}>
      <div className={cl.chat__left}>
        {photo ?
          <img src={photo} />
        :
          <UserIcon />
        }
      </div>
      <div className={cl.chat__right}>
        <div className={cl.chat__main}>
          <div className={cl.chat__title}>
            <span>{title}</span>
          </div>
          <div className={cl.chat__time}>{time}</div>
        </div>
        <div className={cl.chat__lastMessage}>
          <span>{lastMsg?.content || 'No messages here'}</span>
        </div>
      </div>
    </div>
  )
}

export default observer(Chat)