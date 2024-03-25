import React, { useState } from 'react'

import { CopyToClipboard } from './CopyToClipboard'
import styles from '../styles/GPG.module.css'

interface Props {
  publicKey: string
}

export const GPG = ({ publicKey }: Props): React.JSX.Element => {
  const [hide, setHide] = useState(true)
  const handleCheckboxClick = () => setHide(!hide)

  return (
    <div className={styles.gpg_container}>
      <label className={styles.gpg_checkbox_label} htmlFor="check_id">
        {hide ? 'See GPG public key' : 'Hide'}
        <input
          onClick={handleCheckboxClick}
          className={styles.gpg_checkbox_input}
          type="checkbox"
          id="check_id"
        ></input>
      </label>

      <CopyToClipboard
        className={styles.gpg_copy_public_key}
        text={publicKey}
        hidden={hide}
      />

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
