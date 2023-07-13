import { toJS } from 'mobx';
import { useEffect, useState } from 'react';
import { BsArrowLeft, BsPencilFill } from 'react-icons/bs';
import { AiOutlineCheck } from 'react-icons/ai';
import AppStore from '../../../store/AppStore';
import { getDate } from '../../../utils/getMessageTime';
import UserIcon from '../../UI/UserIcon';
import cl from './Profile.module.css';

interface ProfileProps {
  profileOpen: boolean,
  setProfileOpen: (prop: boolean) => void
}

const Profile = ({profileOpen, setProfileOpen}: ProfileProps) => {
  const user = toJS(AppStore.user)
  const [changeDescription, setChangeDescription] = useState(false)
  const [tryChangeDescription, setTryChangeDescription] = useState(false)
  const [description, setDescription] = useState(user.description || "")

  useEffect(() => {
    const changeDescription = async () => {
      try {
        setDescription(await AppStore.changeDescription(description))
        setChangeDescription(false)
      } catch (e) {
        console.log(e)
      } finally {
        setTryChangeDescription(false)
      }
    }
    tryChangeDescription && changeDescription()
  }, [tryChangeDescription])

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
          <div className={cl.profile__changeDescription}>
            {!changeDescription ? <>
              <p>{description}</p>
              <div className="svg-parent hover" onClick={() => setChangeDescription(true)}>
                <BsPencilFill />
              </div>
            </>:<>
              <textarea maxLength={200} onKeyDown={e => e.code === 'Enter' && e.preventDefault()}
                value={description} onChange={e => setDescription(e.target.value)} />
                <div className="svg-parent hover" onClick={() => setTryChangeDescription(true)}>
                  <AiOutlineCheck />
                </div>
            </>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile