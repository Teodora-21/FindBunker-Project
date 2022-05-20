import react from 'react';

import { useAuth0 } from '@auth0/auth0-react';

function LogoutButton() {
    const { logout } = useAuth0();

    return (
        <div>
            <button onClick={() => logout()} className="bg-custom_light_blue rounded-md h-12 w-24 hover:bg-red-600 hover:duration-500">
            Log out
            </button>
        </div>
    )
}

export default LogoutButton;