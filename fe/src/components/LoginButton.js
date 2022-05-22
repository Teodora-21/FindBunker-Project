import react from 'react';
import {useAuth0} from '@auth0/auth0-react';


function LoginButton () {
    const {loginWithRedirect} = useAuth0();

    return (
        <div>
            <button onClick={() => loginWithRedirect()} className="h-12 w-24 bg-custom_fade_green rounded-md hover:bg-slate-600 transition-transform">
                Log In
            </button>
        </div>
    )
}

export default LoginButton;