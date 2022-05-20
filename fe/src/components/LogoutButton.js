import react from 'react';

import { useAuth0 } from '@auth0/auth0-react';

function LogoutButton() {
    const { logout } = useAuth0();

    return (
        <div>
            <button onClick={() => logout()} className="bg-red-500">
            Log out
            </button>
        </div>
    )
}

export default LogoutButton;