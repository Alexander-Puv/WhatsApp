import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import cl from './Login.module.css'
import AppStore from '../../store/AppStore'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className={cl.login}>
      <div className={cl.login__input}>
        <span>Username</span>
        <input value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div className={cl.login__input}>
        <span>Password</span>
        <input
          value={password} onChange={e => setPassword(e.target.value)}
          type='password'
        />
      </div>
      <button
        className={cl.login__button}
        onClick={() => AppStore.login(username, password)}>
        Login
      </button>
    </div>
  )
}

export default observer(Login)