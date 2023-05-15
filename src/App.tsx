import { useContext } from 'react'
import './app.css'
import { AppContext } from './context/AppContext/AppContext'
import Chat from './components/Chat/Chat'
import Login from './components/Login/Login'

function App() {
  const context = useContext(AppContext)

  return (
    <div className='app'>
      {context?.idInstance ?
        <Chat />
      :
        <Login />
      }
    </div>
  )
}

export default App
