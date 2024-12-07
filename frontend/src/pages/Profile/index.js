import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export const Profile = () => {
    return (
        <React.Fragment>
           <div className='d-flex align-items-center p-5'>
                <Container>
                    <Row>
                        <Col md={12} className='d-flex align-items-center justify-content-center'>
                            <div className='card w-100 dashboard-card'>
                                <div className='card-body'>
                                    <Row>
                                        <Col md={12}>
                                            <h1 className='fw-bolder text-white mt-2 mb-3'>
                                                Profile
                                            </h1>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}