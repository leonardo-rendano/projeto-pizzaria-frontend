import styles from './style.module.scss'
import { FaSpinner } from 'react-icons/fa'
import { ButtonProps } from './types'

export function Button({ loading, children, ...rest }: ButtonProps) {
  return (
    <button
      className={styles.button}
      disabled={loading}
      {...rest}
    >
      {
        loading ? (
          <FaSpinner color='#fff' size={16} />
        ) : (
          <a className={styles.buttonText}>
            {children}
          </a>
        )
      }
    </button>
  )
}