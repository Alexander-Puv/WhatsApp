import { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext/AppContext'
import cl from './Login.module.css'

const Login = () => {
  const [idInstance, setIdInstance] = useState('')
  const [apiTokenInstance, setApiTokenInstance] = useState('')
  const context = useContext(AppContext)
  if (!context) return <></>
  const {login} = context

  return (
    <div className={cl.login}>
      <div className={cl.login__input}>
        <span>idInstance</span>
        <input value={idInstance} onChange={e => setIdInstance(e.target.value)} />
      </div>
      <div className={cl.login__input}>
        <span>apiTokenInstance</span>
        <input value={apiTokenInstance} onChange={e => setApiTokenInstance(e.target.value)} />
      </div>
      <button
        className={cl.login__button}
        onClick={() => login(idInstance, apiTokenInstance)}>
        Login
      </button>
    </div>
  )
}

export default Login