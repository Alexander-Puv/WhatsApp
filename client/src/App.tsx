import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
import Login from './components/Login/Login'
import { observer } from 'mobx-react-lite'
import AppStore from './store/AppStore'

function App() {

  return (
    <div className='app'>
      {AppStore.accessToken ?
        <div className='chat'>
          <Sidebar />
          <Main />
        </div>
      :
        <Login />
      }
    </div>
  )
}

export default observer(App)
