import styles from "./PanelActionButton.module.css";

export default function PanelActionButton({
    label,
    onClick,
    disabled = false,
    variant = "default",
}) {
    return (
        <button
            type="button"
            className={`${styles.panelActionButton} ${styles[variant] ?? ""}`}
            onClick={onClick}
            disabled={disabled}
        >
            <span className={styles.label}>{label}</span>
        </button>
    );
}


