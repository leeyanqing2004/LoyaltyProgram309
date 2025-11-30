import './PageButton.css';

function PageButton({ text, active }) {
    return (
        <button
            className={`page-button ${active ? "page-button-active" : ""}`}
        >
            {text}
        </button>
    );
}

export default PageButton;