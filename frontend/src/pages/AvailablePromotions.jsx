import Nav from "../components/Profile/Nav";
import LeftNav from "../components/Profile/LeftNav";
import styles from "./AvailablePromotions.module.css";
import PromotionsTable from "../components/Tables/PromotionsTable";

function AvailablePromotions() {
    return <div className={styles.availPromoPageContainer}>

        {/* top Nav container */}
        <div className={styles.availPromoNav}>
            <Nav />
        </div>

        {/* everything under the top Nav container */}
        <div className={styles.availPromoLeftNavAndTableContainer}>

            {/* left Nav container */}
            <div className={styles.availPromoleftNavContainer}>
                <LeftNav />
            </div>

            {/* everything to the right of the left Nav container */}
            <div className={styles.availPromoTableContainer}>
                <PromotionsTable promoTableTitle={"Available Promotions"} availableOnlyBool={true}/>;
            </div>
        </div>
    </div>;
}

export default AvailablePromotions;