import Nav from "../components/Profile/Nav";
import LeftNav from "../components/Profile/LeftNav";
import styles from "./AllTransactions.module.css";
import TransactionTable from "../components/Tables/TransactionTable";

function PastTransactions() {
    return <div className={styles.allTransactionsPageContainer}>

        {/* top Nav container */}
        <div className={styles.allTransactionsNav}>
            <Nav />
        </div>

        {/* everything under the top Nav container */}
        <div className={styles.allTransactionsLeftNavAndTableContainer}>

            {/* left Nav container */}
            <div className={styles.allTransactionsleftNavContainer}>
                <LeftNav />
            </div>

            {/* everything to the right of the left Nav container */}
            <div className={styles.allTransactionsTableContainer}>
                <TransactionTable transTableTitle={"All Transactions"} includeManageButton={true}/>;
            </div>
        </div>
    </div>;
}

export default PastTransactions;