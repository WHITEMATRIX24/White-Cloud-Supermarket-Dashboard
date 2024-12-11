import React, { useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { RenderButton } from '../../component/Button'
import localStorage from '../../utils/localStorage'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Signin = () => {

    const [formFields, setFormFields] = useState({
        phone_number: '', password: ''
    });

    const navigate = useNavigate()

    const __changeInputFields = (e) => {
        setFormFields({
            ...formFields,
            [e.target.name]: e.target.value
        })
    }



    const __handleSubmit = async (e) => {
        e.preventDefault();
        // Create an object with the form data
        const formData = {
            phone_number: formFields.phone_number,
            password: formFields.password,
        };

        try {
            console.log("formdata", formData);

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, formData);

            if (response.status === 200) {

                localStorage.setData('user-info', { name: 'Testing user' });
                navigate('/');
            } else {
                if (response.data.message === 'Invalid password') {
                    console.error('Invalid password. Please recheck your password.');
                } else {
                    console.error('Login failed. Please check your credentials.');
                }
            }
        } catch (error) {
            console.error('An error occurred during login:', error);
        }
    };

    return (
        <React.Fragment>
            <div className='d-flex align-items-center justify-content-center m-auto w-100 h-100'>
                <Container>
                    <Row>
                        <Col md={6} className='d-flex align-items-center justify-content-center'>
                            <div>
                                <h1 className='text-light fw-bold fs-1'><span style={{ borderBottom: '2px solid white', paddingBottom: '20px' }}>We</span>lcome!</h1>
                                <p className="text-light fst-italic text-sm-start" style={{ paddingTop: '50px' }}>"Manage your products, orders, and customer information efficiently with our easy-to-use admin dashboard. Your one-stop solution for all your e-commerce management needs."</p>
                            </div>
                        </Col>
                        <Col md={4} className='d-flex align-items-center justify-content-center' style={{ marginLeft: '80px' }}>
                            <div className='auth-form' style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '10px', width: '500px', height: '350px' }}>
                                <h3 className='text-center fw-bold text-light'>Sign In</h3>
                                <Form>
                                    <Row className='my-2 mx-0'>

                                        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                                            <Form.Label className="fw-normal text-light" >Phone number</Form.Label>
                                            <Form.Control type="text" placeholder="Enter phone number" name="phone_number" onChange={(e) => __changeInputFields(e)} />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword" >
                                            <Form.Label className="fw-normal text-light" >Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => __changeInputFields(e)} />
                                        </Form.Group>

                                    </Row>
                                    <Row className='my-2 mx-5' >
                                        <RenderButton
                                            variant={'primary'}
                                            type={'submit'}
                                            title={'Signin'}
                                            onClick={__handleSubmit}
                                        />
                                    </Row>
                                </Form>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}