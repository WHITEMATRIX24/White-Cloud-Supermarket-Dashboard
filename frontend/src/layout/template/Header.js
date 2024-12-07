
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useParams } from 'react-router-dom';
import localStorage from '../../utils/localStorage';
import MenuButton from '../../assets/icons/menu_button_64.png';

const Header = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    const logout = () => {
        localStorage.removeData('user-info');
    }

    let data = useParams()

    useEffect (()=>{
        handleStatusChange()

        window.addEventListener('online', handleStatusChange);
        window.addEventListener('offline', handleStatusChange);

        return () => {
            window.removeEventListener('online', handleStatusChange);
            window.removeEventListener('offline', handleStatusChange);
          };
    },[isOnline])

    const handleStatusChange = () => {
        setIsOnline(navigator.onLine);
      }

    return (
        <Navbar collapseOnSelect expand="lg" className='main-header'>
            <Container>
                <Navbar.Brand>
                    <NavLink to={'/profile'}>
                        <img src={MenuButton} width={'35'} height={'35'} alt='menu' />
                    </NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    
                        {/* <NavLink className={'nav-link'} aria-hidden='true' to="/">Order</NavLink> */}
                 
                        <NavLink className={'nav-link'} aria-hidden='true' to="/">Stock</NavLink>

                        {
                            (data.id) ? (<NavLink className={'nav-link'} to="add-item">Edit Item</NavLink>) : (<NavLink className={'nav-link'} to="add-item">Add Item</NavLink>)
                        }

                        <NavLink className={'nav-link'} to="banner">Banner</NavLink>

                        <NavLink className={'nav-link'} to="previous-orders">Previous Orders</NavLink>

                        <NavLink className={'nav-link'} to="in-store-billing">In Store Billing</NavLink>

                        <NavLink className={'nav-link'} to="orders">Orders</NavLink>
                       
                    </Nav>
                    <Nav>
                            {
                                    isOnline ? (
                                        <button className="btn btn-success">Online</button>) : (
                                        <button className="btn btn-danger">Offline</button>
                                    )
                            }
                        <NavLink className={'nav-link'} to="signin" onClick={() => logout()}>
                            Sign Out
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Header;