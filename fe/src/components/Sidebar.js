import react from 'react';
import { GiBunker } from 'react-icons/gi';
import { SiGoogleanalytics } from 'react-icons/si';

function Sidebar() {
    return (
        <div className='fixed top-[15%] min-w-min bottom-0 bg-custom_fade_green border-2 border-custom_light_blue' >
            <div className='flex flex-col space-y-2'>
                <button className='hover:bg-slate-500 active:bg-slate-500 border-2 border-black'>
                    <div className='flex flex-row items-center p-1 space-x-3'>
                        <GiBunker color="black" size="45px" />
                        <h1>Bunker</h1>
                    </div>
                </button>
                <button className='hover:bg-slate-500 active:bg-slate-500 border-2 border-black'>
                    <div className='flex flex-row items-center p-1 space-x-3'>
                        <SiGoogleanalytics color="black" size="40px" />
                        <h1>Analyse</h1>
                    </div>
                </button>
            </div>
            <div className='fixed bottom-0 inset-x-2 text-xs'>
                <p>Made by AWESOME</p>
            </div>
        </div>
    )
}

export default Sidebar;