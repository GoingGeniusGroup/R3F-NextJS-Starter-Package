'use client'
import { AvatarCreator, AvatarCreatorConfig, AvatarExportedEvent } from '@readyplayerme/react-avatar-creator'
import { Avatar } from '@readyplayerme/visage'
import { useState } from 'react'

const config: AvatarCreatorConfig = {
  clearCache: false,
  bodyType: 'fullbody',
  quickStart: false,
  language: 'en',
}

const style = { width: '100%', height: '100vh', border: 'none' }

export default function Avatar_creator() {
  const [avatarUrl, setAvatarUrl] = useState('')
  const [showNotification, setShowNotification] = useState(false)

  const handleOnAvatarExported = (event: AvatarExportedEvent) => {
    setAvatarUrl(event.data.url)
  }

  const handleNextButtonClick = () => {
    setShowNotification(true)
  }

  const handleNotificationClose = () => {
    setShowNotification(false)
  }

  return (
    <>
      <AvatarCreator subdomain='gguser' config={config} style={style} onAvatarExported={handleOnAvatarExported} />
      {avatarUrl && <Avatar modelSrc={avatarUrl} />}
      {showNotification && (
        <div className='notification'>
          <p>Avatar URL: {avatarUrl}</p>
          <button onClick={handleNotificationClose}>Close</button>
        </div>
      )}
      <button onClick={handleNextButtonClick}>Next</button>
    </>
  )
}
