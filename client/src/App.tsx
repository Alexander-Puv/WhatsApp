import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
import Login from './components/Login/Login'
import { observer } from 'mobx-react-lite'
import AppStore from './store/AppStore'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      AppStore.checkAuth()
    } else {
      AppStore.setIsLoading(false)
    }
  }, [])

  return (
    <div className='app'>
      {!AppStore.isLoading ?
        AppStore.isAuth ?
          <div className='chat'>
            <Sidebar />
            <Main />
          </div>
        :
          <Login />
      :
        "Loading"
      }
    </div>
  )
}

export default observer(App)
