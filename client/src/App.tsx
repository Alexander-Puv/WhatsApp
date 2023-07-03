import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
import Login from './components/Login/Login'
import { observer } from 'mobx-react-lite'
import AppStore from './store/AppStore'
import { useEffect } from 'react'
import Loader from './components/Loader/Loader'
import {connect} from 'socket.io-client';
import ChatStore from './store/ChatStore'
import { ROOT_URL } from './http'

function App() {
  useEffect(() => {
    const socket = connect(ROOT_URL);

    socket.on('connect', () => {
      console.log('Connected to sockets server');
    });

    socket.on('newChat', chat => {
      ChatStore.setChats([...ChatStore.chats, chat])
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
