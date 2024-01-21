import styles from '../styles/GPG.module.css'
import React from 'react'

interface Props {
  publicKey: string
}

export const GPG = ({ publicKey }: Props): React.JSX.Element => {
  return (
    <div className={styles.gpg_container}>
      <input
        className={styles.gpg_checkbox_input}
        type="checkbox"
        id="check_id"
      ></input>
      <label className={styles.gpg_checkbox_label} htmlFor="check_id"></label>

      <div className={styles.gpg_public_key}>
        {publicKey.split('\n').map((line) => {
          if (!line) return <br />

          return <p>{line}</p>
        })}
      </div>
    </div>
  )
}
