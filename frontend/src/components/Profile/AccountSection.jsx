import { useAuth } from "../../contexts/AuthContext.jsx";
import "./AccountSection.css";

function AccountInfo({ label, value }) {
    return <div className="account-section-account-info">
        <p className="account-section-account-info-label">{label}</p>
        <p className="account-section-account-info-value">{value}</p>
    </div>;
}

function AccountSection({ id }) {
    const { user, login, logout, createAccount, sendResetPassEmail, setPassword } = useAuth();
    const utorid = user?.utorid;
    const role = user?.role;
    const createdAt = user?.createdAt;
    const memberSince = new Date(createdAt).toDateString();
    // const status = user?.status;

    function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return  <div id={id} className="account-section">
                <div className="account-section-details">
                    <div className="account-section-settings">
                        <h2 className="account-section-title">Account Details</h2>
                        {AccountInfo({label: "UTORid", value: utorid})}
                        {AccountInfo({label: "Role", value: Capitalize(role)})}
                        {AccountInfo({label: "Member Since", value: memberSince})}
                        {/* {AccountInfo({label: "Status", value: status})} */}
                    </div>
                </div>
            </div>;
}

export default AccountSection;