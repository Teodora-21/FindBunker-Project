import react, { useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';

function CardsList() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/bunker/all")
            .then((response) => {
                setCards(response.data);
            })
            .catch((response) => {
            });
    }, [cards]);


    const cardsArray = cards.map((bunker, i) => (
        <Card
            data={bunker}
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