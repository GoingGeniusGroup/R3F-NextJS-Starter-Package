'use client'
import { AvatarCreator, AvatarCreatorConfig, AvatarExportedEvent } from '@readyplayerme/react-avatar-creator'
import { Avatar } from '@readyplayerme/visage'
import axios from 'axios'
import { useRouter } from 'next/router'
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
  const handleOnAvatarExported = (event: AvatarExportedEvent) => {
    setAvatarUrl(event.data.url)
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (event) => {
      event.preventDefault()
      const submit = {
        email,
        password,
      }

      console.log('Submit: ', submit)

      try {
        const { data } = await axios({
          url: '/api/users',
          method: 'POST',
          data: submit,
        })
        console.log('Response:', data)
        if (data != null) {
          router.push('/signin')
        }
      } catch (error) {
        console.log('Error: ', error)
      }
    }

    return (
      <>
        <AvatarCreator subdomain='gguser' config={config} style={style} onAvatarExported={handleOnAvatarExported} />
        {avatarUrl && <Avatar modelSrc={avatarUrl} />}
      </>
    )
  }
}
