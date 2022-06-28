import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from 'antd';

// Custom module
import MyFooter from "./components/MyFooter"
import NavBar from "./components/NavBar"
import RoutingInAuth from "./RoutingInAuth"

// CSS style
import "antd/dist/antd.css";
import styles from "./components/content.module.css"



export default class App extends Component {

    render() {
        
        return (
            <BrowserRouter>
                <Layout>
                    <NavBar />
                    <Layout.Content className={ styles.container } style={{ paddingTop: '70px', minHeight: "823.62px" }} >
                        <main>
                            <RoutingInAuth />
                        </main>
                    </Layout.Content>

                    <MyFooter />

                </Layout>
            </BrowserRouter>

        );
    }
}
