import react from 'react';
import logo from '../assests/photos/logo.png'
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const navigate = useNavigate();
    let pages = []
    const { user } = useAuth0();

    return (
        <div className='fixed w-screen h-[15%] bg-custom_fade_green flex flex-row justify-between items-center'>
            <button onClick={() => { navigate("/home") }}>
                <div className='pl-1'>
                    <img src={logo} height={"30%"} width={"30%"}></img>
                </div>
            </button>
            {(isAuthenticated) ?
                <div className='pr-[200px] text-3xl'>
                    <h1>iBunker</h1>
                </div>
                :
                <div className='pr-[200px] text-3xl'>
                    <h1>Together We Can Change the World</h1>
                </div>

            }
            <div className='pr-5 flex items-center justify-between'>
                {!isAuthenticated && <div className='pr-5 text-3xl'>
                    <h1>iBunker</h1>
                </div>}
                {isAuthenticated &&
                    <div className='flex flex-row items-center space-x-4 bg-custom_light_pink rounded-lg shadow-md'>
                        <div className='flex flex-col items-center space-y-2 space-x-3'>
                            <Link className='no-underline font-semibold' to={"/profile"}>Profile</Link>
                            <LogoutButton />
                        </div>
                        <div className='flex flex-row items-center space-x-3'>
                            <img src={user['picture']} className='rounded-[50%] scale-90'></img>
                        </div>
                    </div>
                }
                {/* {
                    isAuthenticated &&
                    <div>
                        
                    </div>
                } */}
            </div>

        </div>
    )
}

export default NavBar;