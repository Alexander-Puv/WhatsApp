import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BiFilter } from 'react-icons/bi'
import { GoKebabVertical } from 'react-icons/go'
import { VscClose } from 'react-icons/vsc'
import ChatStore from '../../store/ChatStore'
import UserIcon from '../UI/UserIcon'
import Chat from './Chat/Chat'
import cl from './Sideabr.module.css'
import { toJS } from 'mobx'

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState('')

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
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)}/>
            {searchQuery &&
              <button className={cl.search__closeButton + ' svg-parent'}
                onClick={() => setSearchQuery('')}>
                <VscClose />
              </button>
            }
          </div>
          <button className={cl.filter + ' svg-parent'}>
            <BiFilter />
          </button>
        </div>

        <div className={cl.sidebar__scroll}>
          <div className={cl.sidebar__chats}>
            {toJS(ChatStore.chats).map(chatId =>
              <Chat chatId={chatId} key={chatId} />
            )}
          </div>
        </div>
          
      </div>
    </div>
  )
}

export default Sidebar