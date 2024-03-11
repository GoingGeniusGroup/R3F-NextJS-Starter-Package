import styles from './createavatar.module.css'

const CreateAvatar = () => {
  return (
<<<<<<< HEAD
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <p className='text-white text-5xl mb-8'>Create Your Avatar</p>
      <div className='flex'>
        <button className='inline-block bg-white text-black font-bold rounded-lg px-6 py-2 mr-4'>
          <a href='/avatar'>Create Avatar</a>
        </button>
        <button className='inline-block bg-[#E5FF25] text-black font-bold rounded-lg px-6 py-2'>
          <a href='https://gguser.readyplayer.me/avatar?frameApi'>Edit Avatar</a>
        </button>
=======
      <div className='flex flex-col justify-center items-center w-full h-full'>
        <p className='text-white text-5xl mb-8'>Create Your Avatar</p>
        <div className='flex'>
          <button className='inline-block bg-white text-black font-bold rounded-lg px-6 py-2 mr-4' route='/avatar'>
            Create Avatar
          </button>
          <button className='inline-block bg-[#E5FF25] text-black font-bold rounded-lg px-6 py-2' route='/avatar'>
            Edit Avatar
          </button>
        </div>
>>>>>>> 1de9dcca051b43fb6accc015248e213dfa8e0523
      </div>
    </div>
  )
}
export default CreateAvatar
