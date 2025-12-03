import styles from "./AllUsers.module.css";
import UserTable from "../components/Tables/UserTable";

function AllUsers() {
    return (
        <div className={styles.allUsersTableContainer}>
            <UserTable userTableTitle={"All Users"} />
        </div>
    );
}

export default AllUsers;
