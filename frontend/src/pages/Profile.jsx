import Nav from "../components/Profile/Nav";
import LeftNav from "../components/Profile/LeftNav";
import ProfileSection from "../components/Profile/ProfileSection";
import AccountSection from "../components/Profile/AccountSection";
import "./Profile.css";

function RightSide() {
    return <div id="profile-right-side">
        <ProfileSection id="profile-profile-section"/>
        <AccountSection id="profile-account-section"/>
    </div>
}

function Profile() {
    return <div id="profile-grid-container">
        <Nav id="profile-nav"/>
        <LeftNav id="profile-left-nav"/>
        <RightSide />
    </div>;
}

export default Profile;