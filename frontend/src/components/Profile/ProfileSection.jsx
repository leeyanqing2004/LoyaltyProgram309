import { useState } from "react";
import api from "../../api/api";
import styles from "./ProfileSection.module.css";

function isValidName(name) {
    return name && 1 <= name.length && name.length <= 50;
}

function isValidEmail(email) {
    return email && email.endsWith("mail.utoronto.ca");
}

function isValidBirthday(birthday) {
    if (!birthday) {
        return false;
    }

    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(birthday)) {
        return false;
    }

    const [year, month, day] = birthday.split("-").map(Number);
    const date = new Date(year, month, day);
    const today = new Date();
    if (date > today) {
        return false;
    }

    return date.getFullYear() === year && (date.getMonth()) === month && date.getDate() === day;
}

function ProfileField({ type, label, field, setField, error }) {
    return  <div className={styles['profile-section-profile-field']}>
        <label className={styles['profile-section-profile-field-label']} htmlFor={label}>{label}</label>
        <input className={styles['profile-section-profile-field-input']} 
               type={type} 
               id={label} 
               name={label} 
               value={field} 
               onChange={(e) => setField(e.target.value)} 
        />
        {error && <span className={styles['profile-section-error']}>{error}</span>}
    </div>;
}

function getEditingFields(locked, setLocked, onCancel, onSave) {
    let content;
    if (locked) {
        content = <button className={styles['profile-section-edit-button']} onClick={() => setLocked(false)}>Edit</button>
    } else {
        content = <div className={styles['profile-section-editing-buttons']}>
            <button className={styles['profile-section-discard-changes-button']} onClick={onCancel}>Cancel</button>
            <button className={styles['profile-section-save-changes-button']} onClick={onSave}>Save Changes</button>
        </div>
    }
    return <div className={styles['profile-section-editing-fields']}>{content}</div>;
}

function ProfileSection({ id, className }) {
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

    const profileSectionSettingsStyle = locked ? styles['profile-section-settings-locked'] : styles['profile-section-settings-unlocked'];
    const profileSectionNewImageButtonStyle = locked ? "" : styles['profile-section-new-image-button-unlocked'];
    const profileSectionRemoveImageButtonStyle = locked ? "" : styles['profile-section-remove-image-button-unlocked'];
    const profileSectionChangePasswordButtonStyle = locked ? "" : styles['profile-section-change-password-button-unlocked'];

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
        setNameError("");
        setBirthdayError("");
        setEmailError("");

        let containsErrors = false;
        if (name && !isValidName(name)) {
            setNameError("Name must be between 1 and 50 characters.");
            containsErrors = true;
        }

        if (birthday && !isValidBirthday(birthday)) {
            setBirthdayError("Birthday must be a valid date in the format YYYY-MM-DD.");
            containsErrors = true;
        }

        if (email && !isValidEmail(email)) {
            setEmailError("Email must be a valid University of Toronto email address.");
            containsErrors = true;
        }

        if (containsErrors) {
            return;
        }

        try {
            let update = {};
            if (name) {
                update.name = name;
            }

            if (birthday) {
                update.birthday = birthday;
            }

            if (email) {
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

    return <div id={id} className={`${styles['profile-section']} ${className || ''}`}>
        <div className={styles['profile-section-details']}>
            <div className={`${styles['profile-section-settings']} ${profileSectionSettingsStyle}`}>
                <h2 className={styles['profile-section-title']}>My Profile</h2>
                <div className={styles['profile-section-image-settings']}>
                    <img src="/profile.png" alt="Profile Picture" />
                    <button className={`${styles['profile-section-new-image-button']} ${profileSectionNewImageButtonStyle}`}>Upload New Image</button>
                    <button className={`${styles['profile-section-remove-image-button']} ${profileSectionRemoveImageButtonStyle}`}>Remove Image</button>
                </div>
                <div className={styles['profile-section-public-settings']}>
                    <ProfileField type="text" label="Name" field={name} setField={setName} error={nameError} />
                    <ProfileField type="date" label="Birthday" field={birthday} setField={setBirthday} error={birthdayError}/>
                </div>
                <h2 className={styles['profile-section-account-security']}>Account Security</h2>
                <div className={styles['profile-section-private-settings']}>
                    <ProfileField type="email" label="Email" field={email} setField={setEmail} error={emailError} />
                    <ProfileField type="password" label="Old Password" field={oldPassword} setField={setOldPassword} />
                    <ProfileField type="password" label="New Password" field={newPassword} setField={setNewPassword} />
                    {passwordError && <span className={styles['profile-section-error']}>{passwordError}</span>}
                    <div className={styles['profile-section-password']}>
                        <button 
                            className={`${styles['profile-section-change-password-button']} ${profileSectionChangePasswordButtonStyle}`} 
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