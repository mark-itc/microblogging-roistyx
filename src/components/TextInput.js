import { useState } from 'react';
import './TextInput.css'

function TextInput(props) {

    const {
        defaultValue,
        onInputChange,
        minimumChars,
        label,
        type
    } = props;

    const [inputValue, setInputValue] = useState(defaultValue);

    let showError = false;
    if (inputValue && minimumChars && inputValue.length < minimumChars) {
        showError = true;
    }

    const onChange = (e) => {

        if (type == 'number' && isNaN(e.target.value)) {
            return;
        }
        setInputValue(e.target.value);



        onInputChange(e.target.value);
    }

    return (
        <>
            <label className='input-label'>{label}</label>
            <input
                value={inputValue}
                onChange={onChange}
                type="text"
                className='custom-input' />
            {
                showError ?
                    (<span className='error-message'>You need more chars</span>) :
                    null
            }
        </>
    )
}

export default TextInput;