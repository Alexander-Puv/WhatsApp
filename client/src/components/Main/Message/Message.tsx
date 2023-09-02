import IMsg from '../../../types/message'
import { getMessageTime } from '../../../utils/getDate'
import cl from './Message.module.scss'
import { IoCheckmarkOutline, IoCheckmarkDone } from 'react-icons/io5'

interface MessageProps {
  msg: IMsg,
  isMe?: boolean,
  first?: boolean,
  sameUser?: boolean
}

const Message = ({msg, isMe, first, sameUser}: MessageProps) => {
  const time = getMessageTime(new Date(msg.createdAt))

  return (
    <div className={`${
      cl.messageContainer} ${
      isMe && cl.me} ${
      sameUser && cl.sameUser
    }`}>
      <div className={`${cl.message} ${first && cl.first}`}>
        {first && <span className={`${cl.tailOut} svg-parent`}>
          <svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enableBackground="new 0 0 8 13"><path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"></path><path d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"></path></svg>
        </span>}

        <span className={cl.message__content}>{msg.content}</span>
        <span className={cl.message__padding}></span>
        <span className={cl.message__right}>
          <span className={cl.message__time}>{time}</span>
          {isMe && <span className={`${
            cl.message__read} ${
            msg.isRead && cl.message__read_true
            } svg-parent`
          }>
            {!msg.isRead
              ? <IoCheckmarkOutline />
              : <IoCheckmarkDone />
            }
          </span>}
        </span>
      </div>
    </div>
  )
}

export default Message