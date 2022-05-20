import react from 'react';
import logo from '../assests/photos/logo.png'

function NavBar() {
    return (
        <div className='fixed w-screen h-[15%] bg-custom_fade_green flex flex-row justify-between items-center'>
            <div className='pl-1'>
                <img src={logo} height={"30%"} width={"30%"}></img>
            </div>
            <div className='pr-80 text-3xl'>
                <h1>iBunker</h1>
            </div>
            <div className='pr-10 text-3xl'>
                <h1>iBunker</h1>
            </div>
        </div>
    )
}

export default NavBar;