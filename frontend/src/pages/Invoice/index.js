import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { RenderButton } from '../../component/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/fontawesome-free-solid';
import moment from 'moment';
import { change_status, retrieve_orders } from '../../redux/actions/orders.action';
import { useNavigate } from 'react-router-dom';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

const Invoice = () => {

    const [orders, setOrders] = useState([]);
    const [selectOrder, setSelectOrder] = useState({});
    const [orderStatus, setOrderStatus] = useState('');
    const [acceptedOrdersCount, setAcceptedOrders] = useState('');
    const [packedOrdersCount, setPackedOrders] = useState('');
    const [deliveryOrdersCount, setDeliveryOrders] = useState('');
    const [deliveredOrdersCount, setDeliveredOrders] = useState('');

    const navigate = useNavigate()
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
    }

    
    const handleClick_All = () => {
        try {
            dispatch(
                retrieve_orders()
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
                            <label className='fw-semibold'> {order.cx_name} </label>
                        </li>
                    </ul>
                    <ul>
                        <div className='text-end'>
                            <li className='fw-semibold m-0'>{order.oba}/-</li>
                            <li>{order.order_status}</li>
                        </div>
                    </ul>
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

        let body =  []
        selectOrder.item_details.map(data => {
            return (
                body.push([
                    data.item_code,
                    data.item_name, 
                    data.item_mrp, 
                    data.discount,
                    data.offer_price
                ])
            )
        })
       
        const doc = new jsPDF();
         autoTable(doc, {
            body: [
              [
                {
                  content: 'WHITE'
                  +'\n'
                  +"Cloud_Supermarket",
                  styles: {
                    halign: 'center',
                    fontSize: 20,
                    textColor: '#000',
                  }
                }
              ],
            ],
            theme: 'plain'
          });

          autoTable(doc, {
            body: [
              [
                {
                  content: 'Order' + ' '+"Estimate",
                  styles: {
                    halign: 'center',
                    fontSize: 20,
                    textColor: '#000'
                  }
                }
              ],
            ],
            theme: 'plain'
          });

          autoTable(doc, {
            body: [
              [
                {
                  content: selectOrder?.cx_name
                  +'\n'
                  + selectOrder?.cx_phone_number,
                  styles: {
                    halign: 'left'
                  }
                },
                
                {
                  content: selectOrder?.order_id
                  +'\n'
                  +moment(selectOrder?.order_date).format("MMMM D, YYYY"),
                  styles: {
                    halign: 'right'
                  }
                }
              ],
            ],
          })

         autoTable(doc, {
            head: [['Item Code', 'Item Name', 'Item Price','Discount', 'Amount']],
            body:body,
            theme: 'grid',
            headStyles:{
              fillColor: '#343a40'
            }
          });

          autoTable(doc, {
            body: [
              [
                {
                  content: 'Total :'+ + selectOrder?.oba,
                  styles: {
                    halign: 'right',
                    fontSize: 14
                  }
                }
              ],
            ],
          });
          
        doc.autoPrint({variant: 'non-conform'});  
        doc.save('Order-details.pdf')
    };

    
    const handleChange = (e) =>{

        const formData = new FormData()
        formData.append('orderId',selectOrder.order_id)
        formData.append('order_status',e.target.value)

        try {
            dispatch(change_status(formData)
            ).then((response) => {
                navigate('/previous-orders')
            }).catch((error) => {
                console.log('error : ', error);
            })
        } catch (error) {
            console.log('error : ', error)
        }
    }

    console.log(selectOrder.order_status);


    const __clickSendToWhatsapp = async () => {
        try {
            window.open(`https://wa.me/+91${selectOrder.cx_phone_number}?text=${encodeURIComponent(" ")}`);
        } catch (err) {
          console.error(err);
        }
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
                                    
                                    <div class="d-flex justify-content-around border-primary">
                                    <button type="button" class="btn btn-light" onClick={handleClick_All}>&nbsp;&nbsp;All Orders &nbsp;&nbsp;</button>
                                    <button type="button" class="btn btn-light" onClick={handleClick_Accepted}>Accepted<span class="badge badge-light align-middle"><p class="display-6 text-danger" style={{fontWeight: 'bold'}}><strong>&nbsp;&nbsp;{acceptedOrdersCount}</strong></p></span></button>                                                                        
                                    <button type="button" class="btn btn-light" onClick={handleClick_Packed}>Packed<span class="badge badge-light align-middle"><p class="display-6 text-danger"  style={{fontWeight: 'bold'}}><strong>&nbsp;{packedOrdersCount}</strong></p></span></button>
                                    <button type="button" class="btn btn-light" onClick={handleClick_Delivery}>Out for Delivery<span class="badge badge-light align-middle"><p class="display-6 text-danger"  style={{fontWeight: 'bold'}}><strong>&nbsp;{deliveryOrdersCount}</strong></p></span></button>
                                    <button type="button" class="btn btn-light" onClick={handleClick_Delivered}>Delivered Today<span class="badge badge-light align-middle"><p class="display-6 text-success"  style={{fontWeight: 'bold'}}><strong>&nbsp;{deliveredOrdersCount}</strong></p></span></button>
                                    </div>
                                    <br/>
                                    {
                                        orders.length > 0 ? (
                                            <Row>
                                                 <Col md={5}>
                                                    <div className='orders-list'>
                                                        {orders.map((order, key) => {
                                                                return (__renderOrderSection(order, key)
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </Col>
                                                {
                                                    selectOrder.order_id? (<>
                                                        <Col md={7}>
                                                            <Row>
                                                                <Col md={12} className='d-flex justify-content-between'>
                                                                    <div>
                                                                        <h3 className='text-white'>
                                                                            Order Detail
                                                                        </h3>
                                                                    </div>
                                                                    <div>
                                                                        <label className='fw-semibold mb-2'>Change order status</label>
                                                                        <Col md={{span:10}}>
                                                                            <select className='form-control text-center' onChange={handleChange} >
                                                                                <option value="" disabled="disabled">order status</option>
                                                                                <option value="Accepted">Accepted</option>
                                                                                <option value="Packed">Packed </option>
                                                                                <option value="Delivery">Delivery </option>
                                                                                <option value="Delivered">Delivered</option>
                                                                            </select>
                                                                            {/* <button className='btn btn-ouline-white' onClick={(e) => submit(e)}>Go</button> */}
                                                                        </Col>
                                                                    </div>
                                                                </Col> 
                                                                <Col md={12} className="my-5">
                                                                   <div className='order border border-2 p-3'>
                                                                         <div className='text-center text-white'>
                                                                            <h3><strong>WHITE</strong></h3>
                                                                            <h2>Cloud_Supermarket</h2>
                                                                         </div>
                                                                         <div className='d-flex justify-content-between align-items-center'>
                                                                             <div className='text-start'>
                                                                                 <p className='m-0 fw-semibold'>{selectOrder?.cx_name}</p>
                                                                                 <p className='m-0 fw-semibold'>{selectOrder?.cx_phone_number}</p>
                                                                             </div>
                                                                             <div className='text-end'>
                                                                                 <p className='m-0 fw-semibold'>{selectOrder?.order_id}</p>
                                                                                 <p className='m-0 fw-semibold'>{moment(selectOrder?.order_date).format("MMMM D, YYYY")}</p>
                                                                             </div>
                                                                         </div> 

                                                                         <hr />
                                                                         <div className='m-3'>
                                                                             <table className='table'>
                                                                                 <thead>
                                                                                 <tr className='text-center'>    
                                                                                         <th>Item Code</th>
                                                                                         <th>Item Name</th>
                                                                                         <th>Item MRP</th>
                                                                                         <th>Discount</th>
                                                                                         <th>Amount</th>
                                                                                         <th>Count</th>
                                                                                     </tr>
                                                                                 </thead>
                                                                                <tbody>
                                                                                    {selectOrder.item_details.map(item =>{
                                                                                        return (
                                                                                                <>
                                                                                                <tr className='text-center'>
                                                                                                    <td>{item.item_code}</td>
                                                                                                    <td>{item.item_name}</td>
                                                                                                    <td>{item.item_mrp}/-</td>
                                                                                                    <td>{item.discount}</td>
                                                                                                    <td>{(item.offer_price)}/-</td>
                                                                                                    <td>{(item.count ? item.count : 1)}</td>
                                                                                                </tr>
                                                                                                </>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                 </tbody> 
                                                                                </table>
                                                                                {orders.map((order) => {
                                                                                     return (
                                                                                         <>
                                                                                             {
                                                                                                 (selectOrder?.order_id === order.order_id) && 
                                                                                                     <div className='text-end'>
                                                                                                         <p className='m-0'><b>SubTotal :{order.oba}/-</b></p>
                                                                                                     </div>
                                                                                             }
                                                                                         </>
                                                                                         )
                                                                                 })
                                                                             }
                                                                            </div>
                                                                            <div className='text-start'>
                                                                             <div className='d-flex justify-content-end'>
                                                                                <Row className='text-end'>
                                                                                     <Col>
                                                                                     <OverlayTrigger placement="bottom" overlay={<Tooltip id="Print">Banner</Tooltip>}>
                                                                                         <RenderButton
                                                                                             variant={"primary"}
                                                                                             type={"button"}
                                                                                             title={<FontAwesomeIcon icon={faPrint}/>}
                                                                                             onClick={__clickStockReportPDF}   
                                                                                             />
                                                                                     </OverlayTrigger>
                                                                                     </Col>
                                                                                     <Col>
                                                                                     <OverlayTrigger placement="bottom" overlay={<Tooltip id="Whatsapp">Send to Whatsapp</Tooltip>}>
                                                                                     
                                                                                        <RenderButton
                                                                                            variant={"primary"}
                                                                                            type={"button"}
                                                                                            title={<FontAwesomeIcon icon={faWhatsapp}/>}
                                                                                            onClick={__clickSendToWhatsapp}
                                                                                            //onClick={window.open(`https://wa.me/+91${selectOrder.cx_phone_number}`)}
                                                                                        />
                                                                                    
                                                                                      </OverlayTrigger>
                                                                                     </Col>
                                                                                 </Row>
                                                                               </div>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                            </Row>
                                                        </Col>
                                                    </>

                                                        
                                                        // selectOrder?.id ? (
                                                            //     <Col md={7}>
                                                            //         <Row>
                                                            //             <Col md={12}>
                                                            //                 <h3 className='text-white'>
                                                            //                     Invoice Detail
                                                    //                 </h3>
                                                    //             </Col>
                                                    //             <Col md={12} className="my-5">
                                                    //                 <div className='order border border-2 p-3'>
                                                    //                     <div className='text-center text-white'>
                                                    //                         <h3>Company Name</h3>
                                                    //                     </div>
                                                    //                     <div className='d-flex justify-content-between align-items-center'>
                                                    //                         <div className='text-start'>
                                                    //                             <p className='m-0 fw-semibold'>{selectOrder?.cx_name}</p>
                                                    //                             <p className='m-0 fw-semibold'>{selectOrder?.cx_phone_number}</p>
                                                    //                         </div>
                                                    //                         <div className='text-end'>
                                                    //                             <p className='m-0 fw-semibold'>{selectOrder?.id}</p>
                                                    //                             <p className='m-0 fw-semibold'>{moment(selectOrder?.date).format("MMMM D, YYYY")}</p>
                                                    //                         </div>
                                                    //                     </div>
                                                    //                         <hr />
                                                    //                     <div className='m-3'>
                                                    //                         <table className='table'>
                                                    //                             <thead>
                                                    //                                 <tr className='text-center'>    
                                                    //                                     <th>Item Code</th>
                                                    //                                     <th>Item Name</th>
                                                    //                                     <th>Item MRP</th>
                                                    //                                     <th>Discount</th>
                                                    //                                     <th>Amount</th>
                                                    //                                 </tr>
                                                    //                             </thead>
                                                    //                             <tbody>
                                                    //                                 {selectOrder.stock_id.map(item =>{
                                                    //                                         return (
                                                    //                                             <>
                                                    //                                             <tr className='text-center'>
                                                    //                                                 <td>{item.item_code}</td>
                                                    //                                                 <td>{item.item_name}</td>
                                                    //                                                 <td>{item.item_mrp}/-</td>
                                                    //                                                 <td>0.0</td>
                                                    //                                                 <td>{(item.item_mrp)}</td>
                                                    //                                             </tr>
                                                    //                                             </>
                                                    //                                         )
                                                    //                                     })
                                                    //                                 }
                                                    //                             </tbody>
                                                    //                         </table>
                                                    //                         {orders.map((order) => {
                                                    //                                 return (
                                                    //                                     <>
                                                    //                                         {
                                                    //                                             (selectOrder?.id === order.id) && 
                                                    //                                                 <div className='text-end'>
                                                    //                                                     <p className='m-0'><b>SubTotal :{order.total_price}/-</b></p>
                                                    //                                                 </div>
                                                    //                                         }
                                                    //                                     </>
                                                    //                                     )
                                                    //                             })
                                                    //                         }
                                                    //                         </div>
                                                    //                     <div className='text-start'>
                                                    //                         <div className='form-group'>
                                                    //                             <Row className='text-end'>
                                                    //                                 <Col>
                                                    //                                 <OverlayTrigger placement="bottom" overlay={<Tooltip id="Print">Banner</Tooltip>}>
                                                    //                                     <RenderButton
                                                    //                                         variant={"primary"}
                                                    //                                         type={"button"}
                                                    //                                         title={<FontAwesomeIcon icon={faPrint}/>}
                                                    //                                         onClick={__clickStockReportPDF}
                                                    //                                         />
                                                    //                                 </OverlayTrigger>
                                                    //                                 </Col>
                                                    //                             </Row>
                                                    //                         </div>
                                                    //                     </div>
                                                    //                 </div>
                                                    //             </Col>
                                                    //         </Row>
                                                    //     </Col>
                                                        
                                                    // ) 
                                                    )
                                                    : (<>
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
                                                                    Order not found!!!
                                                                </label>
                                                            </div>
                                                        </Col>
                                                    </>)
                                                }
                                            </Row>
                                        ) : (<>
                                            <div className='d-flex align-items-center justify-content-center m-auto w-25 h-75'>
                                                <label className='fw-semibold text-white'>
                                                    NO ORDERS NEEDS ATTENTION!!!
                                                </label>
                                            </div>
                                        </>)
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

export default Invoice