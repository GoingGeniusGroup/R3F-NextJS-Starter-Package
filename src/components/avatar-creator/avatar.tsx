'use client'
import { useUser } from '@/context/UserContext/UserContext';
import { AvatarCreator, AvatarCreatorConfig, AvatarExportedEvent } from '@readyplayerme/react-avatar-creator';
import axios from 'axios';
import { useRouter } from "next/router"; // Import useRouter from next/router
import { useState } from "react";

const config: AvatarCreatorConfig = {
  clearCache: false,
  bodyType: 'fullbody',
  quickStart: false,
  language: 'en',
};

const style = { width: '100%', height: '100vh', border: 'none' };

export default function Avatar_creator() {
  const [avatarUrl, setAvatarUrl] = useState('');
  const { log } = console
  const { user } = useUser();
  const userId = user.gg_id;
  const router = useRouter(); // Initialize useRouter

  const handleOnAvatarExported = async (event: AvatarExportedEvent) => {
    const exportedAvatarUrl = event.data.url;
    setAvatarUrl(exportedAvatarUrl);

    const submit = {
      avatarUrl: exportedAvatarUrl
    };

    log('Submit: ', submit);

    try {
      const { data } = await axios({
        url: `/api/avatar/${userId}`,
        method: 'PUT',
        data: submit,
      })
      log('Response:', data);

      // Redirect to another page after successful avatar export
      router.push("/another-page"); // Change "/another-page" to the desired URL
    } catch (error) {
      log('Error: ', error)
    }
  };

  return (
      <>
        <AvatarCreator subdomain="gguser" config={config} style={style} onAvatarExported={handleOnAvatarExported} />
      </>
  );
}
