import { observer } from 'mobx-react-lite';
import React, { useRef, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { BsArrowLeft, BsPencilFill } from 'react-icons/bs';
import AppStore from '../../../store/AppStore';
import { getDate } from '../../../utils/getDate';
import UserIcon from '../../UI/UserIcon';
import cl from './Profile.module.scss';

interface ProfileProps {
  profileOpen: boolean,
  setProfileOpen: (prop: boolean) => void
}

const Profile = ({profileOpen, setProfileOpen}: ProfileProps) => {
  const {user} = AppStore
  const [changeDesc, setChangeDesc] = useState(false)
  const [description, setDescription] = useState(user.description || "")
  const photoRef = useRef<HTMLInputElement>(null)

  const changePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const photo = e.target.files?.[0]
    photo && AppStore.changePhoto(photo)
  }

  const changeDescription = () => {
    AppStore.changeDescription(description)
    setChangeDesc(false)
  }

  return (
    <div className={`${cl.profile} ${profileOpen && cl.open}`}>
      <div className={cl.profile_back}>
        <div>
          <div className="svg-parent svg-parent_hover" onClick={() => setProfileOpen(false)}>
            <BsArrowLeft />
          </div>
          <h2>Profile</h2>
        </div>
      </div>

      <div className={cl.profile_forward}>
        <div className={cl.profile__photo} onClick={() => photoRef.current?.click()}>
          <input type="file" accept="image/*" ref={photoRef} onChange={changePhoto} />
          {user.photo ?
            <div style={{backgroundImage: `url(${user.photo})`}} />
          :
            <UserIcon />
          }
        </div>
        <div className={cl.profile__userData}>
          <h1 className={cl.profile__username}>{user.username}</h1>
          <h3 className={cl.profile__date}>Registration date: {getDate(new Date(user.createdAt))}</h3>
        </div>
        <div className={cl.profile__description}>
          <h3>Description:</h3>
          <div className={cl.profile__changeDesc}>
            {!changeDesc ? <>
              <p>{description}</p>
              <div className="svg-parent svg-parent_hover" onClick={() => setChangeDesc(true)}>
                <BsPencilFill />
              </div>
            </>:<>
              <textarea maxLength={200} onKeyDown={e => e.code === 'Enter' && e.preventDefault()}
                value={description} onChange={e => setDescription(e.target.value)} />
                <div className="svg-parent svg-parent_hover" onClick={changeDescription}>
                  <AiOutlineCheck />
                </div>
            </>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(Profile)