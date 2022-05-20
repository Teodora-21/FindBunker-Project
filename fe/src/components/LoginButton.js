import react from 'react';
import {useAuth0} from '@auth0/auth0-react';


function LoginButton () {
    const {loginWithRedirect} = useAuth0();

    return (
        <div>
            <button onClick={() => loginWithRedirect()} className="bg-green-500">
                Log In
            </button>
        </div>
    )
}

export default LoginButton;