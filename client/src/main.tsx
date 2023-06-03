import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import AppContextProvider from './context/AppContext/AppContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppContextProvider>
    <App />
  </AppContextProvider>
)
