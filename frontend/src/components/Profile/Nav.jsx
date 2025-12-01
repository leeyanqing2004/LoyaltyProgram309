import { useAuth } from "../../contexts/AuthContext.jsx";
import styles from "./Nav.module.css";

function Nav({ id, className }) {
    const { user } = useAuth();
    return (<nav id={id} className={`${styles.nav} ${className || ''}`}>
                <ul className={styles['nav-list']}>
                    <li className={styles['nav-list-item']}>
                        <a className={styles['nav-list-item-link']} href="/">Events</a>
                    </li>
                    <li className={styles['nav-list-item']}>
                        <a className={styles['nav-list-item-link']} href={`/profile/${user?.utorid}`}>Profile</a>
                    </li>
                    <li className={styles['nav-list-item']}>
                        <a className={styles['nav-list-item-link']} href="/">Settings</a>
                    </li>
                </ul>
    </nav>);
}

export default Nav;