import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BiFilter } from 'react-icons/bi'
import { GoKebabVertical } from 'react-icons/go'
import { VscClose } from 'react-icons/vsc'
import AppStore from '../../store/AppStore'
import ChatStore from '../../store/ChatStore'
import IChat from '../../types/chat'
import UserIcon from '../UI/UserIcon'
import Chat from './Chat/Chat'
import Profile from './Profile/Profile'
import cl from './Sideabr.module.scss'

const Sidebar = () => {
  const {user} = AppStore
  const [searchQuery, setSearchQuery] = useState('')
  const [searchChats, setSearchChats] = useState<IChat[] | undefined | null>(null)
  const [userChat, setUserChat] = useState<IChat | undefined | null>(null)
  const [profileOpen, setProfileOpen] = useState(false)
  
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery) {
        const chats = await ChatStore.findChat(searchQuery)
        setSearchChats(chats[1])

        const foundUser = chats[0]
        const chat: IChat | undefined = foundUser
          ? await ChatStore.findChatWithUser(foundUser)
            || {
              id: foundUser.uid,
              createdAt: foundUser.createdAt,
              isGroup: false,
              members: [user.uid, foundUser.uid],
              messages: [],
            }
          : undefined
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
      <Profile profileOpen={profileOpen} setProfileOpen={setProfileOpen} />
      
      <header className={cl.sidebar__header + ' header'}>
        <div onClick={() => setProfileOpen(true)}>
          {user.photo ?
            <div className={cl.sidebar__photo} style={{backgroundImage: `url(${user.photo})`}} />
          :
            <UserIcon />
          }
        </div>
        <div className={cl.icons}>
          <button className="svg-parent svg-parent_active">
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
            <input className={cl.search__input} placeholder='Search...'
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
            {user.chats?.map(chatId =>
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

export default observer(Sidebar)