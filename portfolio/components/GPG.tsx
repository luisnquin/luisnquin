import styles from '../styles/GPG.module.css'
import React, { useState } from 'react'

interface Props {
  publicKey: string
}

export const GPG = ({ publicKey }: Props): React.JSX.Element => {
  const [hide, setHide] = useState(true)
  const handleCheckboxClick = () => setHide(!hide)

  return (
    <div className={styles.gpg_container}>
      <label className={styles.gpg_checkbox_label} htmlFor="check_id">
        <input
          onClick={handleCheckboxClick}
          className={styles.gpg_checkbox_input}
          type="checkbox"
          id="check_id"
        ></input>
      </label>

      <textarea
        className={styles.gpg_public_key}
        hidden={hide}
        disabled
        readOnly
        rows={publicKey.split('\n').length}
        value={publicKey}
      ></textarea>
    </div>
  )
}
