import ProfileSection from "../components/Profile/ProfileSection";
import AccountSection from "../components/Profile/AccountSection";
import ProfileShell from "../components/Profile/ProfileShell.jsx";
import styles from "./Profile.module.css";

function RightSide() {
    return <div className={styles.profileRightSide}>
        <ProfileSection className={styles.profileProfileSection}/>
        <AccountSection className={styles.profileAccountSection}/>
    </div>
}

function Profile() {
    return (
        <ProfileShell>
            <RightSide />
        </ProfileShell>
    );
}

export default Profile;
