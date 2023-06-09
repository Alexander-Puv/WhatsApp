import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BiFilter } from 'react-icons/bi'
import { GoKebabVertical } from 'react-icons/go'
import { VscClose } from 'react-icons/vsc'
import cl from './Sideabr.module.css'
import UserIcon from '../UI/UserIcon'
import Chat, { ChatProps } from './Chat/Chat'

const chats: ChatProps[] = [
  {id: '1',title: 'User', date: new Date(), lastMessage: 'Nothing'},
  {id: '2',title: 'User2', date: new Date(Date.now() - 1), lastMessage: 'Anything'},
  {id: '3',title: 'User3', date: new Date(Date.now() - 4), lastMessage: 'Something'},
  {id: '4',title: 'User', date: new Date(), lastMessage: 'Nothing'},
  {id: '5',title: 'User2', date: new Date(Date.now() - 1), lastMessage: 'Anything'},
  {id: '6',title: 'User3', date: new Date(Date.now() - 4), lastMessage: 'Something'},
  {id: '7',title: 'User', date: new Date(), lastMessage: 'Nothing'},
  {id: '8',title: 'User2', date: new Date(Date.now() - 1), lastMessage: 'Anything'},
  {id: '9',title: 'User3', date: new Date(Date.now() - 4), lastMessage: 'Something'},
  {id: '10',title: 'User', date: new Date(), lastMessage: 'Nothing'},
  {id: '11',title: 'User2', date: new Date(Date.now() - 1), lastMessage: 'Anything'},
  {id: '12',title: 'User3', date: new Date(Date.now() - 4), lastMessage: 'Something'},
  {id: '13',title: 'User', date: new Date(), lastMessage: 'Nothing'},
  {id: '14',title: 'User2', date: new Date(Date.now() - 1), lastMessage: 'Anything'},
  {id: '15',title: 'User3', date: new Date(Date.now() - 4), lastMessage: 'Something'},
]


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
            {chats.map((chat, index) =>
              <Chat {...chat} key={index} />
            )}
          </div>
        </div>
          
      </div>
    </div>
  )
}

export default Sidebar