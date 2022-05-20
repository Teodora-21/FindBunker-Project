import react, { useEffect } from 'react';
import LoginButton from './LoginButton';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const { user } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated === true) {
            const identifyId = user['sub'].split("|")[1];

            axios
                .get("http://localhost:8080/user/identityId?" + "identifyId=" + identifyId)
                .then((response) => {
                })
                .catch((response) => {
                    const body = {
                        email: user['email'],
                        address: "null",
                        fullName: user['family_name'] + user['given_name'],
                        identityId: identifyId,
                        phone_number: "null" 
                    }
                    axios
                        .post("http://localhost:8080/user/", body)
                        .then((response) => {
                        })
                        .catch((response) => {
                            console.log(response)
                        });
                });
            navigate('/home');
        }
    }, [isAuthenticated]);

    return (
        <div className=''>
            <LoginButton />
        </div>
    )
}

export default Login;