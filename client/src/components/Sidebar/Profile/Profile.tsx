import { VscClose } from 'react-icons/vsc'
import { BsArrowLeft } from 'react-icons/bs'
import cl from './Profile.module.css'
import AppStore from '../../../store/AppStore';
import { toJS } from 'mobx';
import UserIcon from '../../UI/UserIcon';
import { getDate } from '../../../utils/getMessageTime';

interface ProfileProps {
  profileOpen: boolean,
  setProfileOpen: (prop: boolean) => void
}

const Profile = ({profileOpen, setProfileOpen}: ProfileProps) => {
  const user = toJS(AppStore.user)
  return (
    <div className={`${cl.profile} ${profileOpen && cl.open}`}>
      <div className={cl.profile_back}>
        <div>
          <div className="svg-parent hover" onClick={() => setProfileOpen(false)}>
            <BsArrowLeft />
          </div>
          <h2>Profile</h2>
        </div>
      </div>

      <div className={cl.profile_forward}>
        <div className={cl.profile__photo}>
          {/* {user.photo} */}
          <UserIcon />
        </div>
        <div className={cl.profile__userData}>
          <h1 className={cl.profile__username}>{user.username}</h1>
          <h3 className={cl.profile__date}>Registration date: {getDate(new Date(user.createdAt))}</h3>
        </div>
        <div className={cl.profile__description}>
          <h3>Description:</h3>
          <textarea maxLength={150} onKeyDown={e => e.code === 'Enter' && e.preventDefault()} />
        </div>
      </div>
    </div>
  )
}

export default Profile