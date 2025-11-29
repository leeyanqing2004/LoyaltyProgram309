import { useState } from "react";
import "./ProfileSection.css";

function ProfileField({ type, label, field, setField }) {
    return  <div className="profile-section-profile-field">
        <label className="profile-section-profile-field-label" htmlFor={label}>{label}</label>
        <input className="profile-section-profile-field-input" type={type} id={label} name={label} value={field} onChange={(e) => setField(e.target.value)} />
    </div>;
}

function getEditingFields(locked, setLocked) {
    let content;
    if (locked) {
        content = <button className="profile-section-edit-button" onClick={() => setLocked(false)}>Edit</button>
    } else {
        content = <div className="profile-section-editing-buttons">
            <button className="profile-section-discard-changes-button" onClick={() => setLocked(true)}>Cancel</button>
            <button className="profile-section-save-changes-button" onClick={() => setLocked(true)}>Save Changes</button>
        </div>
    }
    return <div className="profile-section-editing-fields">{content}</div>;
}

function handlePasswordChange(password) {
    // Placeholder function for changing password
}

function ProfileSection({ id }) {
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [locked, setLocked] = useState(true);
    const lockedStyle = { pointerEvents: 'none', opacity: 0.5 };
    const unlockedStyle = { pointerEvents: 'auto', opacity: 1 };
    return <div id={id} className="profile-section">
        <div className="profile-section-details">
            <div className="profile-section-settings" style={locked ? lockedStyle : unlockedStyle}>
                <h2 className="profile-section-title">My Profile</h2>
                <div className="profile-section-image-settings">
                    <img src="/profile.png" alt="Profile Picture" />
                    <button className="profile-section-new-image-button">Upload New Image</button>
                    <button className="profile-section-remove-image-button">Remove Image</button>
                </div>
                <div className="profile-section-public-settings">
                    <ProfileField type="text" label="Name" field={name} setField={setName} />
                    <ProfileField type="date" label="Birthday" field={birthday} setField={setBirthday} />
                </div>
                <h2 className="profile-section-account-security">Account Security</h2>
                <div className="profile-section-private-settings">
                    <ProfileField type="email" label="Email" field={email} setField={setEmail} />
                    <ProfileField type="password" label="Password" field={password} setField={setPassword} />
                    <div className="profile-section-password">
                        <button className="profile-section-change-password-button" onClick={() => handlePasswordChange(password)}>Change Password</button>
                    </div>
                </div>
            </div>
            {getEditingFields(locked, setLocked)}
        </div>
    </div>;
}

export default ProfileSection;