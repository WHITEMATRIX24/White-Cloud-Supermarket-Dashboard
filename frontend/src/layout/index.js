
import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from './template/Header'

const Layout = () => {
    return (
        <div className="main-section">
            <Header />
            <Outlet />
        </div>
    )
}

export default Layout;