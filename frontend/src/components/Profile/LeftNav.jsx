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

function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


function LeftTop() {
    const { user } = useAuth();
    const name = user?.name;
    const utorid = user?.utorid;
    const role = user?.role;
    const profilePicture = <img src="/profile.png" alt="Profile Picture" />;
    const userInfo = <div className="left-nav-user-info">
        <h1 className="left-nav-username">{name}</h1>
        <div className="left-nav-user-details">
            <p className="left-nav-UTORid">{utorid}</p>
            <p className="left-nav-user-role">{Capitalize(role)}</p>
        </div>
    </div>;

    return <div className="left-nav-left-top">
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

    const isMyAccountActive = matchPath({ path: "/profile/:utorid/account" }, endpoint);
    const myAccountTab = <div className="left-nav-my-account-tab">
        <PageButton text="My Account" active={isMyAccountActive} path={`/profile/${user.utorid}/account`}/>
    </div>;

    const isPastTransactionsActive = matchPath({ path: "/past-transactions" }, endpoint);
    const pastTransactionsTab = <div className="left-nav-past-transactions-tab">
        <PageButton text="Past Transactions" active={isPastTransactionsActive} path={`/past-transactions`}/>
    </div>;

    return <div className="left-nav-left-middle">
        {homeTab}
        {myAccountTab}
        {pastTransactionsTab}
    </div>;
}

function LeftBottom() {
    const { logout } = useAuth();
    return <div className="left-nav-left-bottom">
        <button className="left-nav-logout-button" onClick={logout}>
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
