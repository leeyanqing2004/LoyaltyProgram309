import { useState } from "react";
import api from "../../api/api";
import "./ProfileSection.css";

function ProfileField({ type, label, field, setField, error }) {
    return  <div className="profile-section-profile-field">
        <label className="profile-section-profile-field-label" htmlFor={label}>{label}</label>
        <input className="profile-section-profile-field-input" 
               type={type} 
               id={label} 
               name={label} 
               value={field} 
               onChange={(e) => setField(e.target.value)} 
        />
        {error && <span className="profile-section-error">{error}</span>}
    </div>;
}

function getEditingFields(locked, setLocked, onCancel, onSave) {
    let content;
    if (locked) {
        content = <button className="profile-section-edit-button" onClick={() => setLocked(false)}>Edit</button>
    } else {
        content = <div className="profile-section-editing-buttons">
            <button className="profile-section-discard-changes-button" onClick={onCancel}>Cancel</button>
            <button className="profile-section-save-changes-button" onClick={onSave}>Save Changes</button>
        </div>
    }
    return <div className="profile-section-editing-fields">{content}</div>;
}

function ProfileSection({ id }) {
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [locked, setLocked] = useState(true);

    const [nameError, setNameError] = useState("");
    const [birthdayError, setBirthdayError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const profileSectionSettingsStyle = locked ? "profile-section-settings-locked" : "profile-section-settings-unlocked";
    const profileSectionNewImageButtonStyle = locked ? "" : "profile-section-new-image-button-unlocked";
    const profileSectionRemoveImageButtonStyle = locked ? "" : "profile-section-remove-image-button-unlocked";
    const profileSectionChangePasswordButtonStyle = locked ? "" : "profile-section-change-password-button-unlocked";

    const handleCancelChanges = () => {
        setName("");
        setBirthday("");
        setEmail("");
        setOldPassword("");
        setNewPassword("");
        setLocked(true);

        setNameError("");
        setBirthdayError("");
        setEmailError("");
        setPasswordError("");
    }

    const handleSaveChanges = async () => {
        try {
            const update = {};
            if (name !== "") {
                update.name = name;
            }

            if (birthday !== "") {
                update.birthday = birthday;
            }

            if (email !== "") {
                update.email = email;
            }

            if (Object.keys(update).length > 0) {
                await api.patch('/users/me', update);
                alert("Profile updated successfully.");
            }

            setLocked(true);
        } catch (error) {
            const err = error.response.data.error;
            const errLower = err.toLowerCase();
            if (errLower.includes("name")) {
                setNameError(err);
            } else if (errLower.includes("birthday")) {
                setBirthdayError(err);
            } else if (errLower.includes("email")) {
                setEmailError(err);
            } else {
                alert(err);
            }
        }
    };

    const handlePasswordChange = async () => {
        setPasswordError("");
        if (oldPassword === "" || newPassword === "") {
            setPasswordError("Please fill in both the old and new password fields.");
            return;
        }

        try {
            await api.patch('/users/me/password', {
                old: oldPassword,
                new: newPassword
            });

            setOldPassword("");
            setNewPassword("");
            alert("Password changed successfully.");
        } catch (error) {
            const err = error.response.data.error;
            setPasswordError(err);
        }
    }

    return <div id={id} className="profile-section">
        <div className="profile-section-details">
            <div className={`profile-section-settings ${profileSectionSettingsStyle}`}>
                <h2 className="profile-section-title">My Profile</h2>
                <div className="profile-section-image-settings">
                    <img src="/profile.png" alt="Profile Picture" />
                    <button className={`profile-section-new-image-button ${profileSectionNewImageButtonStyle}`}>Upload New Image</button>
                    <button className={`profile-section-remove-image-button ${profileSectionRemoveImageButtonStyle}`}>Remove Image</button>
                </div>
                <div className="profile-section-public-settings">
                    <ProfileField type="text" label="Name" field={name} setField={setName} error={nameError} />
                    <ProfileField type="date" label="Birthday" field={birthday} setField={setBirthday} error={birthdayError}/>
                </div>
                <h2 className="profile-section-account-security">Account Security</h2>
                <div className="profile-section-private-settings">
                    <ProfileField type="email" label="Email" field={email} setField={setEmail} error={emailError} />
                    <ProfileField type="password" label="Old Password" field={oldPassword} setField={setOldPassword} />
                    <ProfileField type="password" label="New Password" field={newPassword} setField={setNewPassword} />
                    {passwordError && <span className="profile-section-error">{passwordError}</span>}
                    <div className="profile-section-password">
                        <button 
                            className={`profile-section-change-password-button ${profileSectionChangePasswordButtonStyle}`} 
                            onClick={handlePasswordChange}>
                                Change Password
                        </button>
                    </div>
                </div>
            </div>
            {getEditingFields(locked, setLocked, handleCancelChanges, handleSaveChanges)}
        </div>
    </div>;
}

export default ProfileSection;