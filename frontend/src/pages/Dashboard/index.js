import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { retrieve_orders } from '../../redux/actions/orders.action';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import moment from "moment";

export const Dashboard = () => {

    const [orders, setOrders] = useState([]);
    const [selectOrder, setSelectOrder] = useState({});
    const [loading,setLoading] = useState(true)

    const dispatch = useDispatch();
    const ref = useRef();

    useEffect(() => {
        __fetchOrders()
    }, []);

    const __fetchOrders = () => {
        try {
            dispatch(
                retrieve_orders()
            ).then((response) => {
                setOrders(response.data)
                setTimeout(() => {
                    setLoading(false)
                }, 500);
            }).catch((error) => {
                console.log('error : ', error);
            })
        } catch (error) {
            console.log('error : ', error)
        }
    }
    
    const __renderOrderSection = (order, key) => {
        let id = key + 1
        return (
            <div className='order' key={key} onClick={() => { __selectOrder(order) }}>
                <div className='d-flex align-items-center justify-content-between'>
                    <ul>
                        <li>
                            <label className='fw-semibold'> {id} </label>
                        </li>
                        <li>
                            <label>{moment(order.order_date).format("MMMM D, YYYY")}</label>
                        </li>
                        <li>
                            <label className='fw-semibold'> {order.name} </label>
                        </li>
                    </ul>
                    <div className='text-end'>
                        <p className='fw-semibold m-0'>
                            700.00/-
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    const __selectOrder = (order) => {
        ref.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })

        setSelectOrder(order);
    }

    const __clickStockReportPDF = (e) => {

        let body = [];
       
        body.push([
            selectOrder.name,
            selectOrder.phone_number,
            selectOrder.Order_Date,
            selectOrder.id,
            selectOrder.order_status,
            selectOrder.payment_mode
        ]);

        const doc = new jsPDF();
        autoTable(doc, {
            head: [['Client Name', 'Client Number', 'Order Date','Order Id','Order Status','Payment Mode']],
            body: body,
        })
        doc.save('Order-details.pdf')
    };

    return (
        <React.Fragment>
            <div className='d-flex align-items-center p-5'>
                <Container>
                    <Row>
                        <Col md={12} className='d-flex align-items-center justify-content-center'>
                            <div className='card w-100 dashboard-card' ref={ref}>
                                <div className='card-body'>
                                    <Row>
                                        <Col md={12}>
                                            <h1 className='fw-bolder text-white mt-2 mb-3'>
                                                Orders
                                            </h1>
                                        </Col>
                                    </Row>
                                    {
                                        orders.length > 0 ? (
                                            <Row>
                                                <Col md={5}>
                                                    <div className='orders-list'>
                                                        {
                                                            orders.map((order, key) => {
                                                                return __renderOrderSection(order, key)
                                                            })
                                                        }
                                                    </div>
                                                </Col>
                                                {
                                                    selectOrder?.id ? (
                                                        <Col md={7}>
                                                            <Row>
                                                                <Col md={12}>
                                                                    <h3 className='text-white'>
                                                                        Order Detail
                                                                    </h3>
                                                                </Col>
                                                                <Col md={12} className="my-5">
                                                                    <div className='order border border-2 p-3'>
                                                                        <div className='d-flex justify-content-between align-items-center'>
                                                                            <div className='text-start'>
                                                                                <p className='m-0 fw-semibold'>{selectOrder?.name}</p>
                                                                                <p className='m-0 fw-semibold'>{selectOrder?.phone_number}</p>
                                                                            </div>
                                                                            <div className='text-end'>
                                                                                <p className='m-0 fw-semibold'>{selectOrder?.id}</p>
                                                                                <p className='m-0 fw-semibold'>{moment(selectOrder?.order_date).format("MMMM D, YYYY")}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='m-3'>
                                                                            <table className='table'>
                                                                                <thead>
                                                                                    <tr>    
                                                                                        <th>Item Code</th>
                                                                                        <th>Item Name</th>
                                                                                        <th>Item MRP</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td>1001</td>
                                                                                        <td>XYZ Item</td>
                                                                                        <td>100.00/-</td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                        <div className='d-flex justify-content-around align-items-center'>
                                                                            <div className='text-start'>
                                                                                <p className='m-0'>   Payment Method : Cash</p>
                                                                                <p className='m-0'>   Order Status : Completed</p>
                                                                            </div>
                                                                            <div className='text-start'>
                                                                                <div className='form-group'>
                                                                                    <label className='fw-semibold mb-2'>Change order status:</label>
                                                                                    <select className='form-control text-center'>
                                                                                        <option>Accepted</option>
                                                                                        <option>Packed </option>
                                                                                        <option>OF_Delivery </option>
                                                                                        <option>Delivered</option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    ) : (
                                                        <Col md={7}>
                                                            <Row>
                                                                <Col md={12}>
                                                                    <h3 className='text-white'>
                                                                        Order Detail
                                                                    </h3>
                                                                </Col>
                                                            </Row>
                                                            <div className='m-auto w-50 h-50 d-flex align-items-center justify-content-center'>
                                                                <label className='text-white fw-semibold mb-0'>
                                                                    Order details not found!!!
                                                                </label>
                                                            </div>
                                                        </Col>
                                                    )
                                                }
                                            </Row>
                                        ) : (
                                            <div className='d-flex align-items-center justify-content-center m-auto w-25 h-75'>
                                                <label className='fw-semibold text-white'>
                                                    NO ORDER NEEDS ATTENTION!!!
                                                </label>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}