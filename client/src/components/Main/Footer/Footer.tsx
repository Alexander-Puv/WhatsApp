import React, { useRef, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsFillEmojiSmileFill } from 'react-icons/bs'
import { MdKeyboardVoice } from 'react-icons/md'
import cl from './Footer.module.scss'
import ChatStore from '../../../store/ChatStore'

const Footer = () => {
  const [message, setMessage] = useState('')
  const inputRef = useRef<HTMLDivElement>(null);
  const chat = ChatStore.currentChat

  const handleInputChange = () => {
    if (inputRef.current) {
      setMessage(inputRef.current.textContent || '')
    }
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      message && sendMessage()
    }
  }

  const handleClick = () => {
    if (inputRef.current && inputRef.current.contains(document.activeElement)) {
      return
    }
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const sendMessage = () => {
    chat && ChatStore.sendMsg(message, chat.id)
    setMessage('')
    if (inputRef.current) {
      inputRef.current.textContent = ''
    }
  }

  const voiceMessage = () => {

  }

  return (
    <footer className={cl.footer}>

      <div className={cl.footer__left}>
        <div className="svg-parent svg-parent_active">
          <BsFillEmojiSmileFill />
        </div>
        <div className="svg-parent svg-parent_active">
          <AiOutlinePlus />
        </div>
      </div>

      <div className={cl.footer__input} onClick={handleClick}>
        {!message && <span>Write a message...</span>}
        <div 
          ref={inputRef}
          contentEditable={true}
          onInput={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
      </div>

      <div
        className={cl.footer__right + " svg-parent"}
        onClick={message ? sendMessage : voiceMessage}
      >
        {message ?
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 12C22 11.5008 2.00002 1.51911 2.00002 2.0181C2.00002 2.44571 4.5 9.5 5 10C5.5 10.5 11 11 11 11.5C11 12 5.5 12.5 5 13C4.5 13.5 2 21.4829 2.00002 21.9819C2.00005 22.4809 22 12.4992 22 12Z"/></svg>                
        :
          <MdKeyboardVoice />
        }
      </div>
    </footer>
  )
}

export default Footer