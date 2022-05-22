import react, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';


function Card({ data, userData }) {
    const navigate = useNavigate();
    const { user } = useAuth0();
    // const [userData, setUserData] = useState()
    const [resID, setResId] = useState();


    const handleTransition = () => {
        navigate(`/bunkerinfo/${data.id}`);
    }

    const handleReserve = () => {
        if (data.free_slots < data.max_capacity) {
            const identifyId = user['sub'].split("|")[1];
            console.log(userData);

            const bodyReservation = {
                bunker_id: data.id,
                refugee_id: userData.id,
                reservation_start: null
            }
            console.log(data, bodyReservation)

            axios
                .post("http://localhost:8080/rezervation/", bodyReservation)
                .then((response) => {
                    console.log(response)
                })
                .catch((response) => {
                    console.log(response)
                });

            const bodyBunker = {
                admin_email: data.admin_email,
                admin_name: data.admin_name,
                admin_number: data.admin_number,
                available: data.available,
                free_slots: data.free_slots + 1,
                id: data.id,
                location: data.location,
                max_capacity: data.max_capacity,
                name: data.name,
                rooms_number: data.rooms_number,
                utilities: data.utilities
            }

            axios
                .post("http://localhost:8080/bunker/", bodyBunker)
                .then((response) => {
                    console.log(response)
                })
                .catch((response) => {
                    console.log(response)
                });

            const bodyUser = {
                address: userData.address,
                email: userData.email,
                fullName: userData.fullName,
                has_reservation: 1,
                id: userData.id,
                identityId: userData.identityId,
                phone_number: userData.phone_number
            }

            axios
                .post("http://localhost:8080/user/", bodyUser)
                .then((response) => {
                    console.log(response)
                })
                .catch((response) => {
                    console.log(response)
                });
        }
    }

    const handleLeave = () => {
        const identifyId = user['sub'].split("|")[1];
        console.log(userData);

        const bodyReservation = {
            bunker_id: data.id,
            refugee_id: userData.id,
            reservation_start: null
        }
        console.log(data, bodyReservation)


        axios
            .get("http://localhost:8080/rezervation/all")
            .then((response) => {
                console.log(response);
            })
            .catch((response) => {
                console.log(response)
            });

        axios
            .delete("http://localhost:8080/rezervation/")
            .then((response) => {
                console.log(response)
            })
            .catch((response) => {
                console.log(response)
            });

        const bodyBunker = {
            admin_email: data.admin_email,
            admin_name: data.admin_name,
            admin_number: data.admin_number,
            available: data.available,
            free_slots: data.free_slots - 1,
            id: data.id,
            location: data.location,
            max_capacity: data.max_capacity,
            name: data.name,
            rooms_number: data.rooms_number,
            utilities: data.utilities
        }

        axios
            .post("http://localhost:8080/bunker/", bodyBunker)
            .then((response) => {
                console.log(response)
            })
            .catch((response) => {
                console.log(response)
            });

        const bodyUser = {
            address: userData.address,
            email: userData.email,
            fullName: userData.fullName,
            has_reservation: 1,
            id: userData.id,
            identityId: userData.identityId,
            phone_number: userData.phone_number
        }

        axios
            .post("http://localhost:8080/user/", bodyUser)
            .then((response) => {
                console.log(response)
            })
            .catch((response) => {
                console.log(response)
            });
    }

    return (
        <div className='bg-custom_fade_green border-black border-2 rounded-md w-56 h-56 flex flex-col items-center justify-center space-y-5 shadow-2xl shadow-custom_fade_green' >
            <h1>{data.name}</h1>
            <h1>Capacity: {`${data.free_slots} / ${data.max_capacity}`}</h1>
            <button onClick={handleTransition} className='bg-custom_light_pink text-black rounded-md p-2 hover:bg-slate-400 duration-200 shadow-lg'>More Info</button>
            <button onClick={handleReserve} className='bg-custom_light_pink text-black rounded-md p-2 hover:bg-slate-400 duration-200 shadow-lg'>Reserve </button>
            <button onClick={handleLeave} className='bg-custom_light_pink text-black rounded-md p-2 hover:bg-slate-400 duration-200 shadow-lg'>Stop Rezervation</button>
        </div>
    )
}

export default Card;