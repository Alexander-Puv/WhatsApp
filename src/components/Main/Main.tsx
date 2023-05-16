import cl from './Main.module.css'

const Main = () => {
  return (
    <main className={cl.main}>
      <header className={cl.header + " header"}></header>
      <div className={cl.conv}></div>
      <footer className={cl.footer}></footer>
    </main>
  )
}

export default Main