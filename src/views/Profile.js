import { useState } from 'react';
// import Button from '../components/Button';
import TextInput from '../components/TextInput'
import Button from '../components/Button'
// import Button from '@mui/material/Button';
import '../components/Button.css'
import './Profile.css'

function Profile() {

    const [email, setEmail] = useState('');

    const [ login, setLogin ] = useState()

    return (
        <div className="profile"> 
        <h1>Profile</h1>   
        <TextInput
                label="User Name"
                onInputChange={(value) => { setEmail(value) }}
                type="text" />
            <Button   onClick={() => {
                console.log(email);
                setLogin(email);
            }} />
            </div>
       
    )
}

export default Profile;