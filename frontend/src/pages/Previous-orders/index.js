import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { retrieve_orders } from '../../redux/actions/orders.action';
import { Table } from 'antd';

const PreviousOrders = () => {

    const [orders, setOrders] = useState([]);
    const [acceptedOrdersCount, setAcceptedOrders] = useState('');
    const [packedOrdersCount, setPackedOrders] = useState('');
    const [deliveryOrdersCount, setDeliveryOrders] = useState('');
    const [deliveredOrdersCount, setDeliveredOrders] = useState('');

    const dispatch = useDispatch();
    const ref = useRef();

    useEffect(() => {
        __fetchOrders()
    }, [])

    const __fetchOrders = () => {
        try {
            dispatch(
                retrieve_orders()
            ).then((response) => {
                setOrders(response.data)
                const acceptedOrders = response.data.filter(order => order.order_status === 'Accepted').length;
                setAcceptedOrders(acceptedOrders);
                const packedOrders = response.data.filter(order => order.order_status === 'Packed').length;
                setPackedOrders(packedOrders);
                const deliveryOrders = response.data.filter(order => order.order_status === 'Delivery').length;
                setDeliveryOrders(deliveryOrders);
                const now = new Date();
                const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
                const displayedOrders = response.data.filter(order => {
                    const orderDate = new Date(order.order_date);
                    return order.order_status === 'Delivered' && orderDate >= oneDayAgo;
                  });
                const deliveredOrders = displayedOrders.length;
                setDeliveredOrders(deliveredOrders);
            }).catch((error) => {
                console.log('error : ', error);
            })
        } catch (error) {
            console.log('error : ', error)
        }
    };


    const handleClick_All = () => {
        try {
            dispatch(
                retrieve_orders()//{ order_status: 'Accepted' }
            ).then((response) => {
                setOrders(response.data)
            }).catch((error) => {
                console.log('error : ', error);
            })
        } catch (error) {
            console.log('error : ', error)
        }
    };

    const handleClick_Accepted = () => {
        try {
            dispatch(
                retrieve_orders()
            ).then((response) => {
                const displayedOrders = response.data.filter(order => order.order_status === 'Accepted');
                setOrders(displayedOrders)
            }).catch((error) => {
                console.log('error : ', error);
            })
        } catch (error) {
            console.log('error : ', error)
        }
    };

    
    const handleClick_Packed = () => {
        try {
            dispatch(
                retrieve_orders()
            ).then((response) => {
                const displayedOrders = response.data.filter(order => order.order_status === 'Packed');
                setOrders(displayedOrders)
            }).catch((error) => {
                console.log('error : ', error);
            })
        } catch (error) {
            console.log('error : ', error)
        }
    };

    const handleClick_Delivery = () => {
        try {
            dispatch(
                retrieve_orders()
            ).then((response) => {
                const displayedOrders = response.data.filter(order => order.order_status === 'Delivery');
                setOrders(displayedOrders)
            }).catch((error) => {
                console.log('error : ', error);
            })
        } catch (error) {
            console.log('error : ', error)
        }
    };

    const handleClick_Delivered = () => {
        try {
            dispatch(
                retrieve_orders()
            ).then((response) => {
                const now = new Date();
                const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
                const displayedOrders = response.data.filter(order => {
                    const orderDate = new Date(order.order_date);
                    return order.order_status === 'Delivered' && orderDate >= oneDayAgo;
                  });
                setOrders(displayedOrders)
            }).catch((error) => {
                console.log('error : ', error);
            })
        } catch (error) {
            console.log('error : ', error)
        }
    };



    orders.map((item, index) => {
        item.index = index + 1;
        return item;
      });
  
    const columns = [
        {
          title: "Order ID",
          dataIndex: "index",
          key: "index",
        },
        {
          title: "Client Name",
          dataIndex: "cx_name",
          key: "cx_name",
        },
        {
          title: "Client Number",
          dataIndex: "cx_phone_number",
          key: "cx_phone_number",
        },
        {
          title: "Order Date",
          dataIndex: "order_date",
          key: "order_date",
          sorter: (a, b) => a.order_date > b.order_date, 
          sortDirections: ["descend"], 
        },
        {
          title: "Order Status",
          dataIndex: "order_status",
          key: "order_status",
        },
        {
          title: "Payment Mode",
          dataIndex: "payment_mode",
          key: "payment_mode",
        }
      ];

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
                                                Previous Orders
                                            </h1>
                                        </Col>
                                    </Row>
                                    <div class="d-flex justify-content-around border-primary">
                                        <button type="button" class="btn btn-light" onClick={handleClick_All}>&nbsp;&nbsp;All Orders &nbsp;&nbsp;</button>
                                        <button type="button" class="btn btn-light" onClick={handleClick_Accepted}>Accepted<span class="badge badge-light align-middle"><p class="display-6 text-danger" style={{fontWeight: 'bold'}}><strong>&nbsp;&nbsp;{acceptedOrdersCount}</strong></p></span></button>                                                                        
                                        <button type="button" class="btn btn-light" onClick={handleClick_Packed}>Packed<span class="badge badge-light align-middle"><p class="display-6 text-danger"  style={{fontWeight: 'bold'}}><strong>&nbsp;{packedOrdersCount}</strong></p></span></button>
                                    <button type="button" class="btn btn-light" onClick={handleClick_Delivery}>Out for Delivery<span class="badge badge-light align-middle"><p class="display-6 text-danger"  style={{fontWeight: 'bold'}}><strong>&nbsp;{deliveryOrdersCount}</strong></p></span></button>
                                    <button type="button" class="btn btn-light" onClick={handleClick_Delivered}>Delivered Today<span class="badge badge-light align-middle"><p class="display-6 text-success"  style={{fontWeight: 'bold'}}><strong>&nbsp;{deliveredOrdersCount}</strong></p></span></button>
                                    </div>
                                    <br />

                                    <Table
                                        rowKey={(row) => row._id}
                                        dataSource={orders}
                                        columns={columns}
                                        scroll={{ x: 900 }}
                                        align="center"
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default PreviousOrders