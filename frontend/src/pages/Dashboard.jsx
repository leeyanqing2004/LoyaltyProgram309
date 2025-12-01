import Nav from "../components/Profile/Nav";
import LeftNav from "../components/Profile/LeftNav";
import { AvailablePointsDisplay, StartTransactionQR } from "../components/Dashboard/DashboardTopSection";
import styles from "./Dashboard.module.css";
import Button from '@mui/material/Button';
import TransactionTable from "../components/Tables/TransactionTable";

// TODO: should we move the Nav and LeftNav components out of the Profile folder, since we'll use it
// for multiple pages?

function Dashboard() {
    return <div className={styles.dashboardPageContainer}>

        {/* top Nav container */}
        <div className={styles.dashboardNav}>
            <Nav />
        </div>

        {/* everything under the top Nav container */}
        <div className={styles.dashboardLeftNavAndDashContainer}>

            {/* left Nav container */}
            <div className={styles.dashboardleftNavContainer}>
                <LeftNav />
            </div>

            {/* everything to the right of the left Nav container */}
            <div className={styles.dashboardDashContainer}>

                <div className={styles.dashboardDashTopContainer}>

                    {/* Available Points container */}
                    <div className={styles.dashboardAvailPoints}>
                        <AvailablePointsDisplay availablePoints={120} />
                    </div>

                    {/* QR Code container */}
                    <div className={styles.dashboardQR}>
                        <StartTransactionQR qrCodeInfo={"QR CODE INFO HERE"} />
                    </div>

                </div>

                <div className={styles.dashboardDashBottomContainer}>
                    <TransactionTable transTableTitle={"Recent Transactions"} includeManageButton={false}/>;
                </div>

            </div>
        </div>
    </div>;
}

export default Dashboard;