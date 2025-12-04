import { matchPath, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import PageButton from "./PageButton.jsx";
import styles from './LeftNav.module.css';
import { capitalize } from "../../utils/capitalize";

function LeftTop() {
    const { user } = useAuth();
    if (!user) return null;

    const name = user.name || "";
    const utorid = user.utorid || "";
    const role = user.role || "";
    const profilePicture = <img src="/profile.png" alt="Profile Picture" />;
    const userInfo = <div className="left-nav-user-info">
        <h1 className="left-nav-username">{name}</h1>
        <div className="left-nav-user-details">
            <p className="left-nav-UTORid">{utorid}</p>
            <p className="left-nav-user-role">{capitalize(role)}</p>
        </div>
    </div>;

    return <div className={styles.leftNavLeftTop}>
        {profilePicture}
        {userInfo}
    </div>;
}

function LeftMiddle({ endpoint }) {
    const { user } = useAuth();
    if (!user) {
        return null;
    }
    const isHomeActive = matchPath({ path: "/profile/:utorid/home" }, endpoint) || matchPath({ path: "/home" }, endpoint);
    const homeTab = <div className="left-nav-home-tab">
        <PageButton text="Home" active={isHomeActive} path="/home"/>
    </div>;

    const isPastTransactionsActive = matchPath({ path: "/past-transactions" }, endpoint);
    const pastTransactionsTab = <div className="left-nav-past-transactions-tab">
        <PageButton text="Past Transactions" active={isPastTransactionsActive} path={`/past-transactions`}/>
    </div>;

    return <div className={styles.leftNavLeftMiddle}>
        {homeTab}
        {pastTransactionsTab}
    </div>;
}

function LeftBottom() {
    const { logout } = useAuth();
    return <div className={styles.leftNavLeftBottom}>
        <button className={styles.leftNavLogoutButton} onClick={logout}>
            Logout
        </button>
    </div>;
}

function LeftNav({ id }) {
    const location = useLocation();
    const endpoint = location.pathname.toLowerCase();
    return <div id={id} className="left-nav">
        <LeftTop />
        <LeftMiddle endpoint={endpoint} />
        <LeftBottom />
    </div>;
}

export default LeftNav;
