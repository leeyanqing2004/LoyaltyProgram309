import { useNavigate } from "react-router-dom";
import './PageButton.css';

function PageButton({ text, active, path }) {
    const navigate = useNavigate();
    const activeClass = active ? "page-button-active" : "";
    return (
        <button
            className={`page-button ${activeClass}`}
            onClick={() => navigate(path)}
        >
            {text}
        </button>
    );
}

export default PageButton;