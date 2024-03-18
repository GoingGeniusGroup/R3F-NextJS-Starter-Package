'use client'
import { AvatarCreator, AvatarCreatorConfig, AvatarExportedEvent } from '@readyplayerme/react-avatar-creator';
import { useRouter } from 'next/navigation';

import { useState } from "react";

const config: AvatarCreatorConfig = {
  clearCache: false,
  bodyType: 'fullbody',
  quickStart: false,
  language: 'en',
};

const style = { width: '100%', height: '100vh', border: 'none' };

export default function App() {
  const [avatarUrl, setAvatarUrl] = useState('');
  const router = useRouter()
  const handleOnAvatarExported = (event: AvatarExportedEvent) => {
    router.push('/hero')
    setAvatarUrl(event.data.url);
  };

  return (
      <>
        <AvatarCreator subdomain="gguser" config={config} style={style} onAvatarExported={handleOnAvatarExported} />
      </>
  );
}