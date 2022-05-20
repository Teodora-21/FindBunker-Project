import react from 'react';
import bg_image from '../assests/photos/welcome_background.jpg'
import Login from '../components/Login';

function Welcome() {
    return (
        <div className="fixed top-[15%] bottom-[0%] w-screen bg-background bg-cover bg-no-repeat ">
            <div className='absolute inset-0 bg-black bg-opacity-75'>
                <div className='fixed top-[15%] bottom-[0%] min-w-full flex items-center justify-center'>
                    <Login />
                </div>
            </div>
        </div>

    )
}

export default Welcome;