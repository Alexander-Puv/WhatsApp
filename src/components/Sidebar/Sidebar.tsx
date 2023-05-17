import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BiFilter } from 'react-icons/bi'
import { GoKebabVertical } from 'react-icons/go'
import { VscClose } from 'react-icons/vsc'
import cl from './Sideabr.module.css'
import UserIcon from '../UI/UserIcon'

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

        <div className={cl.chats}>
          <div className={cl.chat}>
            <div className={cl.chat__left}>
              <UserIcon />
            </div>
            <div className={cl.chat__right}>
              <div className={cl.chat__cell}>
                <div className={cl.chat__title}>
                  <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt a itaque aspernatur accusantium recusandae quod officiis laborum facilis adipisci atque doloremque incidunt laudantium soluta, reiciendis, quo provident! Excepturi, libero delectus?</span>
                </div>
                <div className={cl.chat__time}>22:22</div>
              </div>
              <div className={cl.chat__lastMessage}>
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, architecto. Nihil voluptatem magnam adipisci. Autem quos quod iste error numquam impedit alias voluptate cumque eos quibusdam? Mollitia corporis tempora neque.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar