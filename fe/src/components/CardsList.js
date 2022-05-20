import react from 'react';
import { bunkers }  from '../assests/data/bunker'
import Card from './Card';

function CardsList () {

    const cardsArray = bunkers.map(bunker => (
        <Card
          name={bunker.name}
          capacity={bunker.capacity}
          />
      ));

    return (
        <div className='flex flex-wrap space-x-20 items-center justify-center'>
            {cardsArray}
        </div>
    )
}

export default CardsList;