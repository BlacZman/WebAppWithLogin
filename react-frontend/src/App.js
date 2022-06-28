import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from 'antd';

// Custom module
import MyFooter from "./components/MyFooter"
import NavBar from "./components/NavBar"
import MyLayout from "./components/Layout"
import WeatherRandom from "./Pages/WeatherRandom"
import NoPage from "./Pages/NoPage"
import Login from "./Pages/Login"

// CSS style
import "antd/dist/antd.css";
import styles from "./components/content.module.css"

export default class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <NavBar />
                    <Layout.Content className={ styles.container } style={{ paddingTop: '64px', minHeight: "823.62px" }} >
                        <main>
                            <Routes>
                                <Route path="/" element={<WeatherRandom />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/*" element={<NoPage />} />
                            </Routes>
                        </main>
                    </Layout.Content>

                    <MyFooter />
                </Layout>
            </BrowserRouter>

        );
    }
}
