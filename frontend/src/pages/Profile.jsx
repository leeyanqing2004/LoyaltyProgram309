import Nav from "../components/Profile/Nav";
import LeftNav from "../components/Profile/LeftNav";
import ProfileSection from "../components/Profile/ProfileSection";
import AccountSection from "../components/Profile/AccountSection";
import styles from "./Profile.module.css";

function RightSide() {
    return <div className={styles.profileRightSide}>
        <ProfileSection className={styles.profileProfileSection}/>
        <AccountSection className={styles.profileAccountSection}/>
    </div>
}

function Profile() {
    return <div className={styles.profileGridContainer}>
        <Nav className={styles.profileNav}/>
        <LeftNav className={styles.profileLeftNav}/>
        <RightSide />
    </div>;
}

export default Profile;