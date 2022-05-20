import react from 'react';

function Card({name, capacity}) {
    return (
        <div className='bg-custom_fade_green border-black border-2 rounded-md w-56 h-56 flex flex-col items-center justify-center space-y-6' >
            <h1>{name}</h1>
            <h1>Capacity: {capacity}</h1>
            <button className='bg-custom_light_pink text-black rounded-md p-2'>More Info</button>
        </div>
    )
}

export default Card;