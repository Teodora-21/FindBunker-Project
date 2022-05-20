import react from 'react';
import Card from './Card';
import NavBar from './Navbar';
import Sidebar from './Sidebar';

function Bars () {
    return (
        <div className='flex flex-col bg-slate-600 h-full w-full'>
            <NavBar />
            <div className='w-full h-full flex flex-row'>
                <Sidebar />
                <div className='flex flex-row space-x-10 w-full h-full bg-amber-400'>
                    <Card bunkerName={"Bunker1"} capacity={"Capacity: 15/1250"}/>
                    <Card bunkerName={"Bunker2"} capacity={"Capacity: 105/500"}/>
                </div>
            </div>
        </div>
    )

}

export default Bars;