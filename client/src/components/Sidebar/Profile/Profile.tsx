import { VscClose } from 'react-icons/vsc'
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
      <button className={cl.profile__closeButton + ' svg-parent hover'}
        onClick={() => setProfileOpen(false)}>
        <VscClose />
      </button>

      <div className={cl.profile_back}>Profile</div>
      <div className={cl.profile__photo}>
        {/* {user.photo} */}
        <UserIcon />
      </div>
      <div className={cl.profile__userData}>
        <h1 className={cl.profile__username}>{user.username}</h1>
        <h3 className={cl.profile__date}>{getDate(new Date(user.createdAt))}</h3>
      </div>
    </div>
  )
}

export default Profile