import { useContext } from 'react'
import './App.css'
import { AppContext } from './context/AppContext/AppContext'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
import Login from './components/Login/Login'
import ChatContextProvider from './context/ChatContext/ChatContext'

function App() {
  const context = useContext(AppContext)

  return (
    <div className='app'>
      {context?.username ?
        <ChatContextProvider>
          <div className='chat'>
            <Sidebar />
            <Main />
          </div>
        </ChatContextProvider>
      :
        <Login />
      }
    </div>
  )
}

export default App
