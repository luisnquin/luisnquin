import { CopyToClipboard } from './CopyToClipboard'
import styles from '../styles/HeroCopy.module.css'

interface Props {
  text: string
  tooltip?: string
  isCommand?: boolean
  isContactMail?: boolean
}

export const HeroCopy = ({
  text,
  tooltip,
  isCommand,
  isContactMail,
}: Props) => {
  return (
    <div className={styles.container}>
      {isCommand ? <span className={styles.arrow_right}>$</span> : null}

      {isContactMail ? (
        <a href={`mailto:<${text}>`}>{text}</a>
      ) : (
        <h3 className={styles.text}>
          {text}
          {tooltip ? <span>{tooltip}</span> : null}
        </h3>
      )}

      <CopyToClipboard text={text} hidden={false} />
    </div>
  )
}
