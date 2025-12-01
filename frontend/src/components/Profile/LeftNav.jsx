import { matchPath, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import PageButton from "./PageButton.jsx";
import styles from './LeftNav.module.css';

function Menu() {
    return <button className={styles['left-nav-menu']}>
        <span className={styles['left-nav-menu-bar']}></span>
        <span className={styles['left-nav-menu-bar']}></span>
        <span className={styles['left-nav-menu-bar']}></span>
    </button>
}

function LeftTop() {
    const { user } = useAuth();
    const name = user?.name;
    const utorid = user?.utorid;
    const role = user?.role;
    const profilePicture = <img src="/profile.png" alt="Profile Picture" />;
    const userInfo = <div className={styles['left-nav-user-info']}>
        <h1 className={styles['left-nav-username']}>{name}</h1>
        <div className={styles['left-nav-user-details']}>
            <p className={styles['left-nav-UTORid']}>{utorid}</p>
            <p className={styles['left-nav-user-role']}>{role}</p>
        </div>
    </div>;

    return <div className={styles['left-nav-left-top']}>
        {profilePicture}
        {userInfo}
    </div>;
}

function LeftMiddle({ endpoint }) {
    const { user } = useAuth();
    if (!user) {
        return null;
    }
    
    const isHomeActive = matchPath({ path: "/profile/:utorid/home" }, endpoint);
    const homeTab = <div className={styles['left-nav-home-tab']}>
        <PageButton text="Home" active={isHomeActive} path={`/profile/${user.utorid}/home`}/>
    </div>;

    const isMyAccountActive = matchPath({ path: "/profile/:utorid/account" }, endpoint);
    const myAccountTab = <div className={styles['left-nav-my-account-tab']}>
        <PageButton text="My Account" active={isMyAccountActive} path={`/profile/${user.utorid}/account`}/>
    </div>;

    const isTransferPointsActive = matchPath({ path: "/profile/:utorid/transfer-points" }, endpoint);
    const transferPointsTab = <div className={styles['left-nav-transfer-points-tab']}>
        <PageButton text="Transfer Points" active={isTransferPointsActive} path={`/profile/${user.utorid}/transfer-points`}/>
    </div>;

    const isRedeemPointsActive = matchPath({ path: "/profile/:utorid/redeem-points" }, endpoint);
    const redeemPointsTab = <div className={styles['left-nav-redeem-points-tab']}>
        <PageButton text="Redeem Points" active={isRedeemPointsActive} path={`/profile/${user.utorid}/redeem-points`}/>
    </div>;

    const isPastTransactionsActive = matchPath({ path: "/profile/:utorid/past-transactions" }, endpoint);
    const pastTransactionsTab = <div className={styles['left-nav-past-transactions-tab']}>
        <PageButton text="Past Transactions" active={isPastTransactionsActive} path={`/profile/${user.utorid}/past-transactions`}/>
    </div>;

    return <div className={styles['left-nav-left-middle']}>
        {homeTab}
        {myAccountTab}
        {transferPointsTab}
        {redeemPointsTab}
        {pastTransactionsTab}
    </div>;
}

function LeftBottom() {
    const { logout } = useAuth();
    return <div className={styles['left-nav-left-bottom']}>
        <button className={styles['left-nav-logout-button']} onClick={logout}>
            Logout
        </button>
    </div>;
}

function LeftNav({ id, className }) {
    const location = useLocation();
    const endpoint = location.pathname.toLowerCase();
    return <div id={id} className={`${styles['left-nav']} ${className || ''}`}>
        <Menu />
        <LeftTop />
        <LeftMiddle endpoint={endpoint} />
        <LeftBottom />
    </div>;
}

export default LeftNav;