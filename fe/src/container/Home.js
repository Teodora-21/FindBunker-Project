import react, { useEffect, useState } from 'react';
import CardsList from '../components/CardsList';
import Modal from '../components/Modal';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';


function Home() {
    const [modalOn, setModalOn] = useState(false);
    const navigate = useNavigate();
    const [choice, setChoice] = useState(false);
    const { isAuthenticated, loginWithRedirect } = useAuth0();


    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/');
        }
    }, [isAuthenticated]);



    const handleButton = () => {
        setModalOn(true);
    }

    const { user } = useAuth0();

    return (
        <div className='fixed top-[15%] inset-x-[125px] w-full h-full'>
            {user['http://localhost/roles'] == "bunker-admin" &&
            <div className='relative top-[5%] inset-x-[80%]'>
                <button className='bg-custom_light_blue hover:bg-green-400 rounded-md shadow-md' onClick={handleButton}>
                    <div className='p-2'>
                        Add bunker
                    </div>
                </button>
            </div>}
            <div className='relative top-[12%] flex flex-col items-start p-5'>
                {<CardsList />}
            </div>
            <div>
                {modalOn && <Modal setModalOn={setModalOn} setChoice={setChoice} />}
            </div>
        </div>
    )
}

export default Home;