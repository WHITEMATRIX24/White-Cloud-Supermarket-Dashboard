import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/fontawesome-free-solid';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { all_banners, banner_item } from '../../redux/actions/items.action';

export const Banner = () => {

    const [banner, setBanners] = useState([]);
    
    const dispatch = useDispatch();
    const navigate  = useNavigate()

    useEffect(() => {
        get_banner();
    }, []);

    const deleteItem = (code) => {
        const formData  = new FormData()
        formData.append("item_code",code)
            swal({
                title: "Are you sure?",
                text: "you sure want to delete this banner?'",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }) .then(willDelete =>{
                    if (willDelete) {
                        dispatch(banner_item(code))
                        .then((response) => {
                            swal({
                                title: "Done!",
                                text: "Banner is deleted",
                                icon: "success",
                                timer: 2000,
                                showConfirmButton: false,
                                button: (navigate('/banner')),
                            })
                            get_banner();
                        })
                    }
                })
    }

    const get_banner = () =>{
        dispatch(all_banners()).then(res =>{
            setBanners(res.banner)
        }).catch(err =>{
            console.log(err);
        })
    }

    return (
        <React.Fragment>
            <div className='d-flex align-items-center p-5'>
                <Container>
                    <Row>
                        <Col md={12} className='d-flex align-items-center justify-content-center'>
                            <div className='card w-100 dashboard-card'>
                            <div className="card-body">
                                    <Row>
                                        <Col md={12}>
                                        <div className="d-flex justify-content-between">
                                            <h1 className="fw-bolder text-white mt-2 mb-3">Banner</h1>
                                            <button onClick={() => navigate('/banner/add')} className="btn btn-light" style={{height: '40px'}}>Add Banner</button>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <div className="stocks-list">
                                               
                                                <Row className="justify-content-start">
                                                  {<>
                                                         {banner.map((item, key) => {
                                                            return (<>{
                                                            (item.item_hsb === '')  ? (null)  : (
                                                                <Col md={3} key={key}>
                                                                    <div className="item">
                                                                        <div className="product_img">
                                                                            <img src={`data:image/jpeg;base64,${item.banner_img}`} className="" alt='banner_img' />
                                                                        </div>
                                                                        <div className="text-end" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                            <p>Item Code : {item.item_code}</p>
                                                                            <FontAwesomeIcon onClick={() => {deleteItem(item._id)}} icon={faTrash} />
                                                                        </div>
                                                                    </div>
                                                                </Col>)}
                                                                </>
                                                            );
                                                         })}  
                                                    </>
                                                  }  
                                                
                                                </Row>
                                            </div>
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