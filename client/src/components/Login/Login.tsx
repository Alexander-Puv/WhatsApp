import { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext/AppContext'
import cl from './Login.module.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const context = useContext(AppContext)
  if (!context) return <></>
  const {login} = context

  return (
    <div className={cl.login}>
      <div className={cl.login__input}>
        <span>Username</span>
        <input value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div className={cl.login__input}>
        <span>Password</span>
        <input value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button
        className={cl.login__button}
        onClick={() => login(username, password)}>
        Login
      </button>
    </div>
  )
}

export default Login