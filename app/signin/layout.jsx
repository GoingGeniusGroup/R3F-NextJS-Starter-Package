import React from 'react'
import styles from './signin.module.css'

export default function layout({ children }) {
  return <div className={styles.body}>{children}</div>
}
