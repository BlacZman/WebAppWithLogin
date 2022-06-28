import React, { useState, useEffect } from "react"

const CreateTokenProvider = () => {
    let auth_string = localStorage.getItem('REACT_TOKEN_AUTH');
    let _token = JSON.parse(auth_string);

    const getExpirationDate = (jwtToken) => {
        if (!jwtToken) {
            return null;
        }

        const jwt = JSON.parse(atob(jwtToken.split('.')[1]));

        // multiply by 1000 to convert seconds into milliseconds
        return jwt && jwt.exp && jwt.exp * 1000 || null;
    };

    const isExpired = (exp) => {
        if (!exp) {
            return false;
        }

        return Date.now() > exp;
    };

    const getToken = async () => {
        if (!_token) {
            return null;
        }

        return _token && _token.access_token;
    };

    const isLoggedIn = () => {
        return !!_token;
    };

    let observers = [];
    const subscribe = (observer) => {
        observers.push(observer);
    };

    const unsubscribe = (observer) => {
        observers = observers.filter(_observer => _observer !== observer);
    };

    const notify = () => {
        const isLogged = isLoggedIn();
        observers.forEach(observer => observer(isLogged));
    };

    const setToken = (token) => {
        if (token) {
            localStorage.setItem('REACT_TOKEN_AUTH', JSON.stringify(token));
        }
        else {
            localStorage.removeItem('REACT_TOKEN_AUTH');
        }
        _token = token;
        notify();
    };

    return {
        getToken,
        isLoggedIn,
        setToken,
        subscribe,
        unsubscribe,
    };
}

const CreateAuthProvider = () => {
    const tokenProvider = CreateTokenProvider();
    let Name = ''

    const login = (newTokens) => {
        tokenProvider.setToken(newTokens);
    };

    const logout = () => {
        tokenProvider.setToken(null);
    };

    const authFetch = async (input, init) => {
        const token = await tokenProvider.getToken();

        init = init || {};

        init.headers = {
            ...init.headers,
            Authorization: `Bearer ${token}`,
        };

        return fetch(input, init);
    };

    function useAuth() {
        const [isLogged, setIsLogged] = useState(tokenProvider.isLoggedIn());

        useEffect(() => {
            const listener = (newIsLogged) => {
                setIsLogged(newIsLogged);
            };

            tokenProvider.subscribe(listener);
            return () => {
                tokenProvider.unsubscribe(listener);
            };
        }, []);

        return [isLogged];
    };

    const getPayload = async () => {
        const token = await tokenProvider.getToken();
        const payload = JSON.parse(atob(token.split('.')[1]));

        return payload;
    }

    return {
        useAuth,
        authFetch,
        login,
        logout,
        getPayload
    }
};

export const { useAuth, authFetch, login, logout, getPayload } = CreateAuthProvider();