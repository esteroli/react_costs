import styles from './SubmitButton.module.css'

export default function Submit({ text }) {
    return (
        <div>
            <button className={styles.btn}>{text}</button>
        </div>
    )
}