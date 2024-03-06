import styles from './createavatar.module.css'

const CreateAvatar = () => {
  return (
      <div className='flex flex-col justify-center items-center w-full h-full'>
        <p className='text-white text-5xl mb-8'>Create Your Avatar</p>
        <div className='flex'>
          <button className='inline-block bg-white text-black font-bold rounded-lg px-6 py-2 mr-4'>
            <a href='https://gguser.readyplayer.me/avatar?frameApi'>Create Avatar</a>
          </button>
          <button className='inline-block bg-[#E5FF25] text-black font-bold rounded-lg px-6 py-2'>
            <a href='https://gguser.readyplayer.me/avatar?frameApi'>Edit Avatar</a>
          </button>
        </div>
      </div>
  )
}
export default CreateAvatar
