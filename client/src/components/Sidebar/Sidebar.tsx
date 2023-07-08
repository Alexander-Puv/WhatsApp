import { toJS } from 'mobx'
import { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BiFilter } from 'react-icons/bi'
import { GoKebabVertical } from 'react-icons/go'
import { VscClose } from 'react-icons/vsc'
import ChatStore from '../../store/ChatStore'
import IChat from '../../types/chat'
import UserIcon from '../UI/UserIcon'
import Chat from './Chat/Chat'
import cl from './Sideabr.module.css'

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchChats, setSearchChats] = useState<IChat[] | undefined | null>(null)
  const [userChat, setUserChat] = useState<IChat | undefined | null>(null)
  
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery) {
        const chats = await ChatStore.findChat(searchQuery)
        setSearchChats(chats[1])

        const chat = chats[0] ? await ChatStore.findChatWithUser(chats[0]) : undefined
        setUserChat(chat)
      }
    }, 3000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  const closeSearch = () => {
    setSearchQuery('')
    setSearchChats(null)
    setUserChat(null)
  }

  return (
    <div className={cl.sidebar}>
      <header className={cl.sidebar__header + ' header'}>
        <UserIcon />
        <div className={cl.icons}>
          <button className="svg-parent">
            <GoKebabVertical />
          </button>
        </div>
      </header>

      <div className={cl.side}>
        <div className={cl.search}>
          <div className={cl.search__main}>
            <button className={cl.search__button + ' svg-parent'}>
              <AiOutlineSearch />
            </button>
            <input className={cl.search__input} placeholder='Поиск или новый чат'
              autoComplete='off'
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)}/>
            {searchQuery &&
              <button className={cl.search__closeButton + ' svg-parent'}
                onClick={closeSearch}>
                <VscClose />
              </button>
            }
          </div>
          <button className={cl.filter + ' svg-parent'}>
            <BiFilter />
          </button>
        </div>

        <div className={cl.sidebar__scroll}>
          <div className={`${cl.sidebar__chats} ${(userChat || searchChats) && cl.hidden}`}>
            {toJS(ChatStore.chats).map(chatId =>
              <Chat chatId={chatId} key={chatId} />
            )}
          </div>
          {(userChat || searchChats) && <div className={cl.sidebar__chats}>
            {userChat && <Chat chatId={userChat.id} chatData={userChat} />}
            {searchChats?.map((group) =>
              <Chat chatId={group.id} chatData={group} key={group.id} />
            )}
          </div>}
        </div>
          
      </div>
    </div>
  )
}

export default Sidebar