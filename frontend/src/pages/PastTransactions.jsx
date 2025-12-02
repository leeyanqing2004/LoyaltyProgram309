import Nav from "../components/Profile/Nav";
import LeftNav from "../components/Profile/LeftNav";
import styles from "./PastTransactions.module.css";
import TransactionTable from "../components/Tables/TransactionTable";

function PastTransactions() {
    return <div className={styles.pastTransactionsPageContainer}>

        {/* top Nav container */}
        <div className={styles.pastTransactionsNav}>
            <Nav />
        </div>

        {/* everything under the top Nav container */}
        <div className={styles.pastTransactionsLeftNavAndTableContainer}>

            {/* left Nav container */}
            <div className={styles.pastTransactionsleftNavContainer}>
                <LeftNav />
            </div>

            {/* everything to the right of the left Nav container */}
            <div className={styles.pastTransactionsTableContainer}>
                <TransactionTable transTableTitle={"Past Transactions"} includeManageButton={false}/>;
            </div>
        </div>
    </div>;
}

export default PastTransactions;