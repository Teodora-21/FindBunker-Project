import react from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
    const navigate = useNavigate();

    return (
        <div>
            <p>Welcome Page</p>
            <button className='bg-black text-white' onClick={() => navigate("/login")} >Login</button>
        </div>
    )
}

export default Welcome