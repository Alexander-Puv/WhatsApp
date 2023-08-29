import cl from './Message.module.scss'

interface MessageProps {
  content: string,
  isMe?: boolean,
  sameUser?: boolean
}

const Message = ({content, isMe, sameUser}: MessageProps) => {
  return (
    <div className={`
      ${cl.messageContainer}
      ${isMe && cl.me}
      ${sameUser && cl.sameUser}
    `}>
      <div className={cl.message}>{content}</div>
    </div>
  )
}

export default Message