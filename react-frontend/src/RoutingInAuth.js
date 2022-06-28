import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

// Custom module
import { useAuth, logout } from "./TokenProvider"

import WeatherRandom from "./Pages/WeatherRandom"
import NoPage from "./Pages/NoPage"
import Login from "./Pages/Login"
import Register from "./Pages/Register"

const RoutingInAuth = () => {
    const [loggedIn] = useAuth(null);

    const Logout = () => {
        logout();
        
        return (<Navigate to="/">{window.location.replace("../")} </Navigate> );
    };

    return (
        <Routes>
            {!loggedIn && <>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Navigate to="/" />} />
            </>}
            {loggedIn && <>
                <Route path="/register" element={<Navigate to="/" />} />
                <Route path="/login" element={<Navigate to="/" />} />
                <Route path="/logout" element={ <Logout /> }/>
            </>}

            <Route path="/" element={<WeatherRandom />} />
            <Route path="/*" element={<NoPage />} />
        </Routes>
    );
}

export default RoutingInAuth