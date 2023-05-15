import { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext/AppContext'
import cl from './login.module.css'

const Login = () => {
  const [idInstance, setIdInstance] = useState('')
  const [apiTokenInstance, setApiTokenInstance] = useState('')
  const context = useContext(AppContext)
  if (!context) return <></>
  const {login} = context

  return (
    <div className={cl.login}>
      <div className={cl.form}>
        <div className={cl.form__input}>
          <span>idInstance</span>
          <input value={idInstance} onChange={e => setIdInstance(e.target.value)} />
        </div>
        <div className={cl.form__input}>
          <span>apiTokenInstance</span>
          <input value={apiTokenInstance} onChange={e => setApiTokenInstance(e.target.value)} />
        </div>
        <button
          className={cl.form__button}
          onClick={() => login(idInstance, apiTokenInstance)}>
          Login
        </button>
      </div>
    </div>
  )
}

export default Login