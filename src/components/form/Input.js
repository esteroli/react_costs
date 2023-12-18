import styles from './Input.module.css'

export default function Input({ type, text, name, placeholder, handleOnChange, value }) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input 
                autoComplete='off'
                type={type} 
                name={name} 
                id={name} 
                placeholder={placeholder} 
                onChange={handleOnChange}
                value={value}
            ></input>
        </div>
    )
}