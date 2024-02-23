'use client'
import { Avatar } from 'src/components/Avatar';
import styles from '../../App.module.scss';

export default function Male() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Avatar 
            modelSrc="https://models.readyplayer.me/65ba322ee65b37ff56fe0178.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0"
            shadows
            animationSrc="/male-idle-2.fbx"
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