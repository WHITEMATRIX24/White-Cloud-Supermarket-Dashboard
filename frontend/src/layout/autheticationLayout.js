import React from 'react'
import { Outlet } from 'react-router-dom'

const AutheticationLayout = () => {
    return (
        <div className="main-section">
            <Outlet />
        </div>
    )
}

export default AutheticationLayout;