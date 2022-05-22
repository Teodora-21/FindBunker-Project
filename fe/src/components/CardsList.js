import react, { useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

function CardsList() {
    const [cards, setCards] = useState([]);
    const [userData, setUserData] = useState();

    const { user } = useAuth0();

    useEffect(() => {
        axios
            .get("http://localhost:8080/bunker/all")
            .then((response) => {
                setCards(response.data);
            })
            .catch((response) => {
            });

        const identifyId = user['sub'].split("|")[1];

        axios
            .get("http://localhost:8080/user/identityId?" + "identifyId=" + identifyId)
            .then((response) => {
                setUserData(response.data);
            })
            .catch((response) => {
            });

    }, [cards, userData]);


    const cardsArray = cards.map((bunker, i) => (
        <Card
            data={bunker}
            userData={userData}
            key={i}
        />
    ));

    return (
        <div className='flex flex-wrap space-x-20 items-center justify-center'>
            {cardsArray}
        </div>
    )
}

export default CardsList;