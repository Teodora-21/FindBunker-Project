import react, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { GoPrimitiveDot } from 'react-icons/go';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

function CardInfo() {
    let { bunkerId } = useParams();
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState('');
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [maxCapacity, setMaxCapacity] = useState();
    const [location, setLocation] = useState();
    const [utilities, setUtilities] = useState();
    const [rooms, setRooms] = useState();
    const { user } = useAuth0();

    useEffect(() => {
        axios
            .get("http://localhost:8080/bunker?" + "bunkerId=" + bunkerId)
            .then((response) => {
                setData(response.data);
                setName(data.name);
                setMaxCapacity(data.max_capacity);
                setLocation(data.location);
                setUtilities(data.utilities);
                setRooms(data.rooms_number)
                console.log(response);
            })
            .catch((response) => {
                console.log(response);
            });
    }, [edit]);

    const handleClose = () => {
        setEdit(!edit);
        setName(data.name);
        setMaxCapacity(data.max_capacity);
        setLocation(data.location);
        setUtilities(data.utilities);
        setRooms(data.rooms_number)
    }

    const handleSave = () => {
        setEdit(!edit);

        const body = {
            id: bunkerId,
            name: name,
            location: location,
            max_capacity: maxCapacity,
            utilities: utilities,
            admin_name: data.admin_name,
            available: data.available,
            free_slots: data.free_slots,
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
    }

    const handleDelete = () => {
        setEdit(!edit);

        axios
            .delete("http://localhost:8080/bunker?bunkerId=" + bunkerId)
            .then((response) => {
            })
            .catch((response) => {
            });
        navigate('/home');
    }

    return (
        <div className='fixed top-[20%] inset-x-[10%] w-[400px]'>
            <div className='fixed top-[20%] inset-x-[90%]'>
                {user['http://localhost/roles'] == 'bunker-admin' &&
                    <div className='flex flex-row space-x-10'>
                        <button onClick={handleClose}>
                            <div className='scale-[200%] hover:bg-green-500 duration-200 rounded-md'>
                                <AiFillEdit />
                            </div>
                        </button>
                        <button onClick={handleDelete}>
                            <div className='scale-[200%] hover:bg-red-500 duration-200 rounded-md'>
                                <AiFillDelete />
                            </div>
                        </button>
                    </div>
                }
            </div>
            <div className='flex flex-col space-y-4 font-bold'>
                <div className='flex flex-row space-x-5 items-center align-middle'>
                    <div className='text-4xl'>
                        {data.name}
                    </div>
                    <div>
                        {data.free_slots < data.max_capacity ? <GoPrimitiveDot size="2.5em" color="green" /> : <GoPrimitiveDot size="2.5em" color="red" />}
                    </div>
                </div>
                <div>
                    <span>
                        Bunker details
                    </span>
                </div>
                <div>
                    <span>Nume: </span>
                    {!edit ? data.name : <input className='bg-slate-200 rounded-lg' value={name} onChange={e => setName(e.target.value)} ></input>}
                </div>
                <div>
                    <span>Location: </span>
                    {!edit ? data.location : <input className='bg-slate-200 rounded-lg' value={location} onChange={e => setLocation(e.target.value)} ></input>}
                </div>
                <div>
                    <span>Capacity: </span>
                    {`${data.free_slots} / ${data.max_capacity}`}
                </div>
                <div>
                    <span>Number of rooms: </span>
                    {!edit ? data.rooms_number : <input className='bg-slate-200 rounded-lg' value={rooms} onChange={e => setRooms(e.target.value)} ></input>}
                </div>
                <div>
                    <span>Utilities: </span>
                    {!edit ? data.utilities : <input className='bg-slate-200 rounded-lg' value={utilities} onChange={e => setUtilities(e.target.value)} ></input>}
                </div>

                <div>
                    <span>Contact</span>
                </div>
                <div>
                    <span>Email: </span>
                    {data.admin_email}
                </div>
                <div>
                    <span>Number: </span>
                    {data.admin_number}
                </div>
                {edit &&
                    <div className='flex flex-row space-x-5'>
                        <button onClick={handleSave} className='bg-green-500 rounded-md w-16 hover:bg-green-600'>
                            Save
                        </button>
                        <button onClick={handleClose} className="hover:bg-red-500 duration-300 rounded-md w-16">
                            Cancel
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default CardInfo;