import styles from "./DashboardTopSection.module.css";

export function AvailablePointsDisplay( { availablePoints, className }) {
    return  <div className={`${styles.dashboardAvailPointsContainer} ${className}`}>
        <p className={styles.dashboardAvailPointsTitle}>Available Points</p>
        <p className={styles.dashboardAvailPointsAmount}>{ availablePoints }</p>
    </div>;
}

export function StartTransactionQR( { qrCodeInfo, className }) {
    return  <div className={`${styles.dashboardStartTransQRContainer} ${className}`}>
        <p className={styles.dashboardStartTransQRTitle}>Scan to start a transaction</p>
        <p className={styles.dashboardStartTransQRImg}>{ qrCodeInfo }</p> 
    </div>;
}
