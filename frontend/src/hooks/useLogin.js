import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        // const base_url = process.env.REACT_APP_IS_DOCKER? "http://node-app:4000" : 'http://localhost:4000';
        // const base_url = 'http://localhost:4000';
        const base_url = process.env.REACT_APP_BASE_URL;
        const full_url = base_url + '/api/user/login/';
       
        const response = await fetch(full_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password}),
        });
        const data = await response.json();

        if (!response.ok) {
            setError(data.error);
            setIsLoading(false);
        }
        if (response.ok) {
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(data));
            // set user in context 
            dispatch({ type: 'LOGIN', payload: data }); // data looks like {email: user.email, token: token}
            setIsLoading(false);
       
        }
    };
    return { login, isLoading, error };
}