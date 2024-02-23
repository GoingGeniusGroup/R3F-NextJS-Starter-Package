'use client'

import { Avatar } from '@@/src/components/Avatar';
import styles from '../../App.module.scss';

export default function Female_catwalk() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Avatar 
            modelSrc="https://models.readyplayer.me/65bb234c4c8598ef839cdcc2.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0"
            shadows
            animationSrc="/female-animation-catwalk.glb"
            style={{ background: 'rgb(9,20,26)' }}
            fov={45}
            effects={{
              ambientOcclusion: true
            }}
            >
        </Avatar>
      </div>
    </div>
  )
}