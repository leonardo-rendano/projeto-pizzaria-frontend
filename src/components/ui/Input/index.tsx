import styles from './style.module.scss'
import { InputProps, TextAreaProps } from './types'

export function Input({ ...rest }: InputProps) {
    return (
        <input
            className={styles.input}
            {...rest}
        />
    )
}

export function TextArea({ ...rest }: TextAreaProps) {
    return (
        <textarea className={styles.input} {...rest}></textarea>
    )
}