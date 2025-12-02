import Nav from "../components/Profile/Nav";
import LeftNav from "../components/Profile/LeftNav";
import styles from "./AllPromotions.module.css";
import PromotionsTable from "../components/Tables/PromotionsTable";

function AllPromotions() {
    return <div className={styles.allPromoPageContainer}>

        {/* top Nav container */}
        <div className={styles.allPromoNav}>
            <Nav />
        </div>

        {/* everything under the top Nav container */}
        <div className={styles.allPromoLeftNavAndTableContainer}>

            {/* left Nav container */}
            <div className={styles.allPromoleftNavContainer}>
                <LeftNav />
            </div>

            {/* everything to the right of the left Nav container */}
            <div className={styles.allPromoTableContainer}>
                <PromotionsTable promoTableTitle={"All Promotions"} availableOnlyBool={false}/>;
            </div>
        </div>
    </div>;
}

export default AllPromotions;