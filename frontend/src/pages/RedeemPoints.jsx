import Nav from "../components/Profile/Nav";
import LeftNav from "../components/Profile/LeftNav";
import styles from "./RedeemPoints.module.css";
import RedemptionTable from "../components/Tables/RedemptionTable";

function RedeemPoints() {
    return <div className={styles.redeemPointsPageContainer}>

        {/* top Nav container */}
        <div className={styles.redeemPointsNav}>
            <Nav />
        </div>

        {/* everything under the top Nav container */}
        <div className={styles.redeemPointsLeftNavAndTableContainer}>

            {/* left Nav container */}
            <div className={styles.redeemPointsleftNavContainer}>
                <LeftNav />
            </div>

            {/* everything to the right of the left Nav container */}
            <div className={styles.redeemPointsTableContainer}>
                <div className={styles.redeemPointsTableTopContainer}>
                    <button>+ Create New Redemption Request</button>
                </div>
                <div className={styles.redeemPointsTableBottomContainer}>
                    <RedemptionTable redempTableTitle={"Unprocessed Redemptions"} processedBool={false}/>
                    <RedemptionTable redempTableTitle={"Processed Redemptions"} processedBool={true}/>
                </div>
            </div>
        </div>
    </div>;
}

export default RedeemPoints;