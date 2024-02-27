import styles from './createavatar.module.css'

const CreateAvatar = () => {
  return (
    <div className={styles.text}>
      <div className='flex flex-col justify-center items-center h-screen bg-black '>
        <p className='text-white text-5xl mb-8 text-shadow'>Create Your Avatar</p>
        <div className='flex'>
          <button className='inline-block bg-white text-black font-bold rounded-lg px-6 py-2 mr-4'>
            <a href='https://gguser.readyplayer.me/avatar?frameApi'>Create Avatar</a>
          </button>
          <button className='inline-block bg-yellow-300 text-black font-bold rounded-lg px-6 py-2'>
            <a href='https://gguser.readyplayer.me/avatar?frameApi'>Edit Avatar</a>
          </button>
        </div>
      </div>
    </div>
  )
}
export default CreateAvatar