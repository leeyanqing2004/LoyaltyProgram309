import { matchPath, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import PageButton from "./PageButton.jsx";
import './LeftNav.css';

function Menu() {
    return <button className="left-nav-menu">
        <span className="left-nav-menu-bar"></span>
        <span className="left-nav-menu-bar"></span>
        <span className="left-nav-menu-bar"></span>
    </button>
}

function LeftTop() {
    const { user, _ } = useAuth();
    const name = user?.name;
    const utorid = user?.utorid;
    const role = user?.role;
    const profilePicture = <img src="/profile.png" alt="Profile Picture" />;
    const userInfo = <div className="left-nav-user-info">
        <h1 className="left-nav-username">{name}</h1>
        <div className="left-nav-user-details">
            <p className="left-nav-UTORid">{utorid}</p>
            <p className="left-nav-user-role">{role}</p>
        </div>
    </div>;

    return <div className="left-nav-left-top">
        {profilePicture}
        {userInfo}
    </div>;
}

function LeftMiddle({ endpoint }) {
    const { user, _ } = useAuth();
    const isHomeActive = matchPath({ path: "/profile/:utorid/home" }, endpoint);
    const homeTab = <div className="left-nav-home-tab">
        <PageButton text="Home" active={isHomeActive} path={`/profile/${user.utorid}/home`}/>
    </div>;

    const isMyAccountActive = matchPath({ path: "/profile/:utorid/account" }, endpoint);
    const myAccountTab = <div className="left-nav-my-account-tab">
        <PageButton text="My Account" active={isMyAccountActive} path={`/profile/${user.utorid}/account`}/>
    </div>;

    const isTransferPointsActive = matchPath({ path: "/profile/:utorid/transfer-points" }, endpoint);
    const transferPointsTab = <div className="left-nav-transfer-points-tab">
        <PageButton text="Transfer Points" active={isTransferPointsActive} path={`/profile/${user.utorid}/transfer-points`}/>
    </div>;

    const isRedeemPointsActive = matchPath({ path: "/profile/:utorid/redeem-points" }, endpoint);
    const redeemPointsTab = <div className="left-nav-redeem-points-tab">
        <PageButton text="Redeem Points" active={isRedeemPointsActive} path={`/profile/${user.utorid}/redeem-points`}/>
    </div>;

    const isPastTransactionsActive = matchPath({ path: "/profile/:utorid/past-transactions" }, endpoint);
    const pastTransactionsTab = <div className="left-nav-past-transactions-tab">
        <PageButton text="Past Transactions" active={isPastTransactionsActive} path={`/profile/${user.utorid}/past-transactions`}/>
    </div>;

    return <div className="left-nav-left-middle">
        {homeTab}
        {myAccountTab}
        {transferPointsTab}
        {redeemPointsTab}
        {pastTransactionsTab}
    </div>;
}

function LeftBottom() {
    return <div className="left-nav-left-bottom">
        <button className="left-nav-logout-button">
            Logout
        </button>
    </div>;
}

function LeftNav({ id }) {
    const location = useLocation();
    const endpoint = location.pathname.toLowerCase();
    return <div id={id} className="left-nav">
        <Menu />
        <LeftTop />
        <LeftMiddle endpoint={endpoint} />
        <LeftBottom />
    </div>;
}

export default LeftNav;