'use client'

import { Avatar } from '@@/src/components/Avatar';
import styles from '../../App.module.scss';

export default function Male_2() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Avatar 
            modelSrc="https://models.readyplayer.me/658be9e8fc8bec93d06806f3.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0"
            shadows
            animationSrc="/male-idle-3.fbx"
            style={{ background: 'rgb(9,20,26)' }}
            fov={45}
            effects={{
              ambientOcclusion: false
            }}
            >
          </Avatar>
      </div>
    </div>
  )
}