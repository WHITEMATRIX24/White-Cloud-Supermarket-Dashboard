import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { getAllAgents } from '../../redux/actions/AgentAction';
import ReactLoading from 'react-loading';


function AgentDetails() {
   

    const [agentDetails,setAgentDetails]=useState([]);
    const [loading,setLoading] = useState(true)

    const dispatch = useDispatch();


    const getAllAgentDetails = async () => {
        try {
           
            const response = await dispatch(getAllAgents());
            setAgentDetails(response); 
            setLoading(false)
        } catch (err) {
            console.error("Error fetching agent details:", err);
        }
    };


    console.log("AgentDetails:",agentDetails);
    

    useEffect(()=>{
        getAllAgentDetails();
    },[])

    return (
        <React.Fragment>
            <div className="d-flex align-items-center p-5">
                <Container>
                    <Row>
                        <Col md={12} className="d-flex align-items-center justify-content-center">
                            <div className="card w-100 dashboard-card">
                                <div className="card-body">
                                    <Row>
                                        <Col md={12}>
                                            <div className="d-flex justify-content-between ">
                                                <Col>
                                                    <h1 className="fw-bolder text-dark mt-2 mb-3">
                                                        Agent Details
                                                    </h1>
                                                </Col>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div style={{ padding: '20px' }}>
                                       { (loading === true)?(<ReactLoading type={'spinningBubbles'} color={'#fff'} delay={'1'} height={'20%'} width={'6%'} className='loader' />) : 
                                        <Table hover bgcolor='white' style={{ borderRadius: "10px" }}>
                                            <thead>
                                                <tr>
                                                    <th className='text-center'>Order ID</th>
                                                    <th className='text-center'>Agent Name</th>
                                                    <th className='text-center'>Agent Id</th>
                                                    <th className='text-center'>Referral No</th>
                                                    <th className='text-center'>Total Sales</th>
                                                    <th className='text-center'>Total No.of Sales</th>
                                                    <th className='text-center'>Total No.of Users</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {agentDetails? agentDetails.map((order,index) => (
                                                    <tr key={index}>
                                                        <td className='text-center'>{index+1}</td>
                                                        <td className='text-center'>{order.agentName}</td>
                                                        <td className='text-center'>{order.agent_id}</td>
                                                        <td className='text-center'>{order.referralCode}</td>
                                                        <td className='text-center'>{order.totalOrderValue}</td>
                                                        <td className='text-center'>{order.totalSales}</td>
                                                        <td className='text-center'>{order.userCount}</td>

                                                    </tr>
                                                )):
                                                <tr>
                                                <td colSpan={7} className='text-center'>
                                                  <div className='d-flex justify-content-center align-items-center' style={{ height: '100px' }}>
                                                    <h4 className='text-center'>Nothing To Display</h4>
                                                  </div>
                                                </td>
                                              </tr>
                                                }
                                            </tbody>
                                        </Table>}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default AgentDetails;
