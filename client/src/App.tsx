import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { connect } from 'socket.io-client'
import './App.scss'
import Loader from './components/Loader/Loader'
import Login from './components/Login/Login'
import Main from './components/Main/Main'
import Sidebar from './components/Sidebar/Sidebar'
import { ROOT_URL } from './http'
import AppStore from './store/AppStore'
import { toJS } from 'mobx'

function App() {
  useEffect(() => {
    const socket = connect(ROOT_URL);

    socket.on('connect', () => {
      console.log('Connected to sockets server');
    });

    socket.on('newChat', chat => {
      const user = toJS(AppStore.user)
      AppStore.setUser({
        ...user,
        chats: user.chats
          ? [...user.chats, chat]
          : [chat]
      })
    })

    if (localStorage.getItem('token')) {
      AppStore.checkAuth()
    } else {
      AppStore.setIsLoading(false)
    }
    
    return () => {
      socket.disconnect()
    };
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
        <Loader />
      }
    </div>
  )
}

export default observer(App)
