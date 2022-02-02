import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { setTokens } from '../services/localStorageService';
import axios from 'axios';

const httpLogin = axios.create();

const LoginContext = React.createContext();

export const useLogin = () => {
    return useContext(LoginContext);
};

const LoginProvider = ({ children }) => {
    const [error, setError] = useState(null);

    async function logIn({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpLogin.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            console.log('login data', data);
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === 'INVALID_PASSWORD') {
                    const errorObject = {
                        password: 'Неверный пароль'
                    };
                    throw errorObject;
                }
                if (message === 'EMAIL_NOT_FOUND') {
                    const errorObject = {
                        email: 'Пользователь не найден'
                    };
                    throw errorObject;
                }
                if (message === 'USER_DISABLED') {
                    const errorObject = {
                        email: 'Пользователь не активен'
                    };
                    throw errorObject;
                }
            }
            console.log('login error', error);
        }
    }
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    return <LoginContext.Provider value={{ logIn }}>{children}</LoginContext.Provider>;
};

LoginProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default LoginProvider;
