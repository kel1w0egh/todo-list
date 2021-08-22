import "../App.css";

export default function Modal ({active, setActive, children}) {
    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={"modal-content"} onClick={(e) => e.stopPropagation()}>
                <div className={"modal-body"}>
                    {children}
                </div>
            </div>
        </div>
    );
}