import react, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { AiFillEdit } from 'react-icons/ai';
import { TiUserDelete } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [data, setData] = useState('');
    const { user } = useAuth0();
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();
    const { logout } = useAuth0();

    useEffect(() => {
        if (isAuthenticated === true) {
            const identifyId = user['sub'].split("|")[1];

            axios
                .get("http://localhost:8080/user/identityId?" + "identifyId=" + identifyId)
                .then((response) => {
                    console.log(response.data)
                    setData(response.data);
                    setName(data.fullName);
                    setAddress(data.address);
                    setPhone(data.phone_number);
                })
                .catch((response) => {
                });
        }
    }, [edit]);

    const handleClose = () => {
        setEdit(!edit);
        setName(data.fullName);
        setAddress(data.address);
        setPhone(data.phone_number);
    }

    const handleSave = () => {
        setEdit(!edit);

        const body = {
            address: address,
            email: data.email,
            fullName: name,
            id: data.id,
            identityId: data.identityId,
            phone_number: phone
        }

        axios
            .post("http://localhost:8080/user/", body)
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
            .delete("http://localhost:8080/user?userId=" + data.id)
            .then((response) => {
                console.log(response);
            })
            .catch((response) => {
                console.log(response);
            });

        logout();
        navigate('/');
    }


    return (
        <div className='fixed top-[20%] inset-x-[10%] w-[400px]'>
            <div className='fixed top-[20%] inset-x-[90%]'>
                <div className='flex flex-row space-x-10'>
                    <button onClick={handleClose}>
                        <div className='scale-[200%] hover:bg-green-500 duration-200 rounded-md'>
                            <AiFillEdit />
                        </div>
                    </button>
                    <button onClick={handleDelete}>
                        <div className='scale-[200%] hover:bg-red-500 duration-200 rounded-md'>
                            <TiUserDelete />
                        </div>
                    </button>
                </div>
            </div>
            <div className='flex flex-col space-y-4 font-bold'>
                <div>
                    <span>Nume: </span>
                    {!edit ? data.fullName : <input className='bg-slate-200 rounded-lg' value={name} onChange={e => setName(e.target.value)} ></input>}
                </div>
                <div>
                    <span>Address: </span>
                    {!edit ? data.address : <input className='bg-slate-200 rounded-lg' value={address} onChange={e => setAddress(e.target.value)} ></input>}
                </div>
                <div>
                    <span>Email: </span>
                    {data.email}
                </div>
                <div>
                    <span>Phone: </span>
                    {!edit ? data.phone_number : <input className='bg-slate-200 rounded-lg' value={phone} onChange={e => setPhone(e.target.value)} ></input>}
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

export default Profile;