import react, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

function Modal({ setModalOn, setChoice }) {
    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState('');
    const [location, setLocation] = useState('');
    const [utilities, setUtilities] = useState('');
    const [rooms, setRooms] = useState('');
    const { user } = useAuth0();
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const [data, setData] = useState();

    useEffect(() => {
        if (isAuthenticated === true) {
            const identifyId = user['sub'].split("|")[1];

            axios
                .get("http://localhost:8080/user/identityId?" + "identifyId=" + identifyId)
                .then((response) => {
                    setData(response.data);
                    
                })
                .catch((response) => {
                })
        }
    }, [isAuthenticated]);

    const handleAdd = () => {
        console.log(data)

        const body = {
            admin_name: user['family_name'] + " " + user['given_name'],
            available: true,
            free_slots: 0,
            location: location,
            max_capacity: capacity,
            name: name,
            utilities: utilities,
            admin_email: user['email'],
            admin_number: data['phone_number'],
            rooms_number: rooms
        }

        axios
            .post("http://localhost:8080/bunker/", body)
            .then((response) => {
                console.log(response);
            })
            .catch((response) => {
                console.log(response);
            });

        setModalOn(false);
    }

    return (
        <div className='bg-zinc-900 opacity-[95%] fixed inset-0 z-50'>
            <div className='flex h-screen justify-center items-center'>
                <div className='bg-white py-12 px-24 border-4 border-sky-500 rounded-xl space-y-5'>
                    <button onClick={() => setModalOn(false)}>
                        <div className='absolute top-[27%] right-[38%] scale-150 bg-gray-400 hover:bg-red-600 duration-200 rounded-md h-4'>
                            {<AiOutlineClose color />}
                        </div>
                    </button>
                    <div className='flex-col justify-center space-y-5'>
                        <div>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} className="placeholder-gray-700 bg-slate-400 rounded-md font-bold" placeholder="Bunker Name" />
                        </div>
                        <div>
                            <input type="text" value={capacity} onChange={e => setCapacity(e.target.value)} className="placeholder-gray-700 bg-slate-400 rounded-md font-bold" placeholder="Capacity" />
                        </div>
                        <div>
                            <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="placeholder-gray-700 bg-slate-400 rounded-md font-bold" placeholder="Location" />
                        </div>
                        <div>
                            <input type="text" value={utilities} onChange={e => setUtilities(e.target.value)} className="placeholder-gray-700 bg-slate-400 rounded-md font-bold" placeholder="Utilities" />
                        </div>
                        <div>
                            <input type="text" value={rooms} onChange={e => setRooms(e.target.value)} className="placeholder-gray-700 bg-slate-400 rounded-md font-bold" placeholder="Rooms" />
                        </div>
                        <div className='flex items-center justify-center pt-5'>
                            <button onClick={handleAdd} className='bg-custom_fade_green rounded-md scale-125 h-8 w-32 hover:bg-green-600 duration-300'>
                                Add bunker
                            </button>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Modal;