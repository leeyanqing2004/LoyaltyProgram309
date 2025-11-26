import Nav from "../components/Nav";
import LeftNav from "../components/LeftNav";
import ProfileSection from "../components/ProfileSection";
import AccountSection from "../components/AccountSection";
import "./Profile.css";

function Profile() {
    return <div>
        <Nav />
        <LeftNav />
        <ProfileSection />
        <AccountSection />
    </div>;
}

export default Profile;