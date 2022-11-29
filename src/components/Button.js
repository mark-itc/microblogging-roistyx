import { useEffect } from "react";
import "./Button.css"

function Button() {

    // const { text, type, onClick, disabled } = props;
    const type = "primary"
    const text="Login"

    let scheme = '';
    switch (type) {
        case "primary":
            scheme = 'primary';
            break;
        case "danger":
            scheme = 'danger';
            break;
        default:
            console.log('No type was found')
            break;
    }

    return (
        <div className="button-container" >
            <button
                className={`uikit-custom-button ${scheme}`}
                // onClick={onClick}
                // disabled={disabled ? 'disabled' : ''}
            >
                {/* text="Login" */}
                Save
            </button>
        </div>
    )
}

export default Button;