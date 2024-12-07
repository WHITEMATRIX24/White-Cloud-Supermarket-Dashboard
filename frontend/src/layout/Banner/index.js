import React, { useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { RenderButton } from '../../component/Button'

export const Banner = () => {

    const [formFields, setFormFields] = useState({
        LPO_Banner_Images: ''
    })

    const __changeImage = (e) => {
        setFormFields(e.target.files[0])
     }

    const __handleSubmit = (e) => {
        e.preventDefault();
        
        let formData = new FormData()
        formData.append("item_image", formFields);
    }

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
                                                Banner
                                            </h1>
                                        </Col>
                                    </Row>
                                    <Form>
                                        <Row>
                                            <Col md={12}>
                                                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                                                    <Form.Label className='text-white fw-semibold'>Banner image</Form.Label>
                                                    <Form.Control type="file" placeholder="Enter banner image" name="LPO_Banner_Images" onChange={(e) => __changeImage(e)} />
                                                </Form.Group>
                                            </Col>
                                            <Col md={12} className="d-flex align-items-center justify-content-end">
                                                <RenderButton 
                                                    variant={'primary'}
                                                    type={'submit'}
                                                    title={'Submit'}
                                                    onClick={__handleSubmit}
                                                />
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}