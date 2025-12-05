import { useAuth } from "../../contexts/AuthContext.jsx";
import { useViewRole } from "../../contexts/ViewRoleContext.jsx";
import { Link, useLocation } from "react-router-dom";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import styles from "./Nav.module.css";

function Nav({ id, onToggleNav, navOpen = true, className = "" }) {
    const { user } = useAuth();
    const { viewRole, setViewRole } = useViewRole();
    const location = useLocation();
    const path = location.pathname.toLowerCase();
    const isManagerOrHigher = user?.role === "manager" || user?.role === "superuser";
    const isViewRoleManagerOrHigher = viewRole === "manager" || viewRole === "superuser";
    const eventsPath = isViewRoleManagerOrHigher ? "/all-events" : "/published-events";
    const promotionsPath = isViewRoleManagerOrHigher ? "/all-promotions" : "/available-promotions";

    const isEvents = path.startsWith("/published-events") || path.startsWith("/all-events");
    const profilePath = user ? `/profile` : "/login";
    const dashboardPath = user ? `/dashboard` : "/login";
    const isDashboard = path === "/dashboard";
    const isProfile = path.startsWith("/profile");
    const isAllUsers = path.startsWith("/all-users");
    const isAllTransactions = path.startsWith("/all-transactions");
    const isPromotions = path.startsWith("/all-promotions") || path.startsWith("/available-promotions");
    const navClassNames = `${styles.nav} ${className}`.trim();

    const handleViewRoleChange = (event) => {
        const role = event.target.value;
        if (role === "default") {
            setViewRole(null);
        } else {
            setViewRole(role);
        }
    };

    return (
        <nav id={id} className={navClassNames}>
            <div className={styles.navListContainer}>
                {onToggleNav && (
                    <button
                        type="button"
                        className={styles.navToggle}
                        aria-label={`${navOpen ? "Collapse" : "Expand"} sidebar`}
                        aria-expanded={navOpen}
                        onClick={onToggleNav}
                    >
                        <span className={styles.navToggleIcon} />
                    </button>
                )}
                <ul className={styles.navList}>
                    <li className={styles.navListItem}>
                        <Link className={`${styles.navListItemLink} ${isDashboard ? styles.active : ""}`} to={dashboardPath}>Dashboard</Link>
                    </li>

                    <li className={styles.navListItem}>
                        <Link className={`${styles.navListItemLink} ${isEvents ? styles.active : ""}`} to={eventsPath}>Events</Link>
                    </li>

                    <li className={styles.navListItem}>
                        <Link className={`${styles.navListItemLink} ${isPromotions ? styles.active : ""}`} to={promotionsPath}>Promotions</Link>
                    </li>
                    {isViewRoleManagerOrHigher && (
                        <li className={styles.navListItem}>
                            <Link className={`${styles.navListItemLink} ${isAllUsers ? styles.active : ""}`} to="/all-users">Users</Link>
                        </li>
                    )}
                    {isViewRoleManagerOrHigher && (
                        <li className={styles.navListItem}>
                            <Link className={`${styles.navListItemLink} ${isAllTransactions ? styles.active : ""}`} to="/all-transactions">Transactions</Link>
                        </li>
                    )}
                    <li className={styles.navListItem}>
                        <Link className={`${styles.navListItemLink} ${isProfile ? styles.active : ""}`} to={profilePath}>Profile</Link>
                    </li>
                </ul>
                <div className={`${styles.navListItem} ${styles.navLogo}`} >
                    <img src="/logo.svg" className={styles.logoImg} />
                </div>
                {isManagerOrHigher && (
                    <Box className={styles.navViewRoleSelector}>
                        <FormControl size="small">
                            <InputLabel>View As</InputLabel>
                            <Select
                                value={viewRole}
                                label="View as"
                                onChange={handleViewRoleChange}
                            >
                                <MenuItem value="superuser">Superuser</MenuItem>
                                <MenuItem value="manager">Manager</MenuItem>
                                <MenuItem value="cashier">Cashier</MenuItem>
                                <MenuItem value="regular">Regular</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                )}
            </div>
        </nav>
    );
}

export default Nav;
