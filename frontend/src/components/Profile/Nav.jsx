import { useAuth } from "../../contexts/AuthContext.jsx";
import "./Nav.css";

function Nav({ id }) {
    const { user } = useAuth();
    return (<nav id={id} className="nav">
                <ul className="nav-list">
                    <li className="nav-list-item">
                        <a className="nav-list-item-link" href="/">Events</a>
                    </li>
                    <li className="nav-list-item">
                        <a className="nav-list-item-link" href={`/profile/${user?.utorid}`}>Profile</a>
                    </li>
                    <li className="nav-list-item">
                        <a className="nav-list-item-link" href="/">Settings</a>
                    </li>
                </ul>
    </nav>);
}

export default Nav;