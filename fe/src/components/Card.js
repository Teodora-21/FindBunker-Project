import react from 'react';
import { useNavigate } from 'react-router-dom';


function Card({data}) {
    const navigate = useNavigate();

    const handleTransition = () => {
        navigate(`/bunkerinfo/${data.id}`);
    }

    return (
        <div className='bg-custom_fade_green border-black border-2 rounded-md w-56 h-56 flex flex-col items-center justify-center space-y-6 shadow-2xl shadow-custom_fade_green' >
            <h1>{data.name}</h1>
            <h1>Capacity: {data.max_capacity}</h1>
            <button onClick={handleTransition} className='bg-custom_light_pink text-black rounded-md p-2 hover:bg-slate-400 duration-200 shadow-lg'>More Info</button>
        </div>
    )
}

export default Card;