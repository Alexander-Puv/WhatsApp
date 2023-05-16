import cl from './Sideabr.module.css'
import { BiFilter } from 'react-icons/bi'
import { AiOutlineSearch } from 'react-icons/ai'

const Sidebar = () => {
  return (
    <div className={cl.sidebar}>
      <header className={cl.sidebar__header + ' header'}></header>

      <div className={cl.side}>

        <div className={cl.search}>
          <div className={cl.search__main}>
            <button className={cl.search__button + ' svg-parent'}>
              <AiOutlineSearch />
            </button>
          </div>
          <button className={cl.filter + ' svg-parent'}>
            <BiFilter />
          </button>
        </div>

        <div className={cl.chats}></div>
      </div>
    </div>
  )
}

export default Sidebar