import { useAuth } from "../../contexts/AuthContext.jsx";
import styles from "./AccountSection.module.css";

function AccountInfo({ label, value }) {
    return <div className={styles['account-section-account-info']}>
        <p className={styles['account-section-account-info-label']}>{label}</p>
        <p className={styles['account-section-account-info-value']}>{value}</p>
    </div>;
}

function AccountSection({ id, className }) {
    const { user, login, logout, createAccount, sendResetPassEmail, setPassword } = useAuth();
    const utorid = user?.utorid;
    const role = user?.role;
    const createdAt = user?.createdAt;
    const memberSince = new Date(createdAt).toDateString();

    return  <div id={id} className={`${styles['account-section']} ${className || ''}`}>
                <div className={styles['account-section-details']}>
                    <div className={styles['account-section-settings']}>
                        <h2 className={styles['account-section-title']}>Account Details</h2>
                        {AccountInfo({label: "UTORid", value: utorid})}
                        {AccountInfo({label: "Role", value: role})}
                        {AccountInfo({label: "Member Since", value: memberSince})}
                        {/* {AccountInfo({label: "Status", value: status})} */}
                    </div>
                </div>
            </div>;
}

export default AccountSection;