import cl from './Loader.module.scss'

const Loader = () => {
  return (
    <div className={cl.loaderContainer}>
      <div className={cl.loader}></div>
    </div>
  )
}

export default Loader