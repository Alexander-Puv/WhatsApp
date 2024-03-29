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
import { toJS } from 'mobx'

interface ChatProps {
  chatId: string,
  chat?: IChat,
}

const Chat = ({chatId, chat}: ChatProps) => {
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

    // !chat && findChat
    const findChat = async () => {
      const chat = await ChatStore.findChatById(chatId)

      ChatStore.setChats([...toJS(ChatStore.chats), chat])
      ChatStore.setStringChats(toJS(ChatStore.stringChats).filter(val => val !== chat.id))
    }
    
    !chat && findChat()

    // chat
    if (chat) {
      !chat.isGroup && findMember(chat)

      const changeLastMsg = async () => {
        const lastMsg = chat.messages[chat.messages.length - 1]
        setLastMsg(typeof lastMsg === 'string'
          ? await ChatStore.findMsgById(lastMsg)
          : lastMsg
        )
      }
      changeLastMsg()
    }
  }, [])

  if (!chat) return <></>

  const time = getSidebarMessageTime(new Date(lastMsg ? lastMsg.createdAt : chat.createdAt))
  const photo = chat.isGroup ? chat.photo : member?.photo
  const title = chat.isGroup ? chat.name : member?.username

  const clickHandler = async () => {
    const chooseChat = (newChat: IChat) => {
      ChatStore.setCurrentChat(newChat)
      ChatStore.setMember(member)
  
      newChat.messages.slice().reverse().map((msg, i) =>
        // we upload only first 25 messages when a user chooses a chat
        i !== 25 && typeof msg == 'string'
          && ChatStore.findMsgById(msg)
      )
    }

    try {
      await ChatStore.findChatById(chat.id) // if chat does not exist, throws a error
      chooseChat(chat)
    } catch (e) {
      const newChat = await ChatStore.createChat(chat.members[0] !== user.uid
        ? chat.members[0] : chat.members[1]) // actually in this situation reciever is always second but anyway...
      chooseChat(newChat)
    }
  }
  
  return (
    <div onClick={clickHandler}
      className={cl.chat + ' ' + (ChatStore.currentChat?.id === chatId ? cl.chatChosen : '')}>
      <div className={cl.chat__left}>
        {photo ?
          <div className={cl.chat__image} style={{backgroundImage: `url(${photo})`}} />
        :
          <UserIcon />
        }
      </div>
      <div className={cl.chat__right}>
        <div className={cl.chat__main}>
          <div className={cl.chat__title}>
            <span>{title}</span>
          </div>
          <div className={cl.chat__time}>{lastMsg?.content ? time : null}</div>
        </div>
        <div className={cl.chat__lastMessage}>
          <span>{lastMsg?.content || 'No messages here'}</span>
        </div>
      </div>
    </div>
  )
}

export default observer(Chat)