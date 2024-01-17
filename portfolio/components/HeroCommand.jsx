import styles from '../styles/HeroCommand.module.css'
import Image from 'next/future/image'

export function HeroCommand({ command }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(command)
    // TODO: add tooltip
  }

  return (
    <div className={styles.wrapper}>
      <Image
        src="/arrow-right.png"
        alt="arrow-right"
        width={13}
        height={13}
        className={styles.arrow_right}
      />
      <h4 className={styles.text}>{command}</h4>
      <Image
        src="/copy-to-clipboard.png"
        alt="copy-to-clipboard"
        width={15}
        height={15}
        className={styles.copy_to_clipboard}
        onClick={copyToClipboard}
      />
    </div>
  )
}
