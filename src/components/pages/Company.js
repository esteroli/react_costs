import browsing from '../../img/browsing.png'

import styles from './EmptyPages.module.css'

export default function Company() {
    return (
        <div className={styles.infos}>
            <img src={browsing} alt="Browsing"></img>
            <h1 className={styles.typing_animation}>/esteroli</h1>
            <p>Esse projeto é fictício, portanto, não há informações sobre uma empresa.</p>
        </div>
    )
}