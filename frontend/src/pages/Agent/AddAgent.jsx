import React, { useState } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { RenderButton } from "../../component/Button";
import { useDispatch } from "react-redux";
import axios from "axios";

function AddAgent() {
    const [agent, setAgent] = useState({
        agentname: "",
        agentid: "",
    });

    // Function to generate a 5-character alphanumeric string
    const generateRandomString = () => {
        return Math.random().toString(36).substring(2, 6).toUpperCase(); // Random string of 5 characters
    };

    // Function to handle changes and update agent name and ID dynamically
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "agentname") {
            // If agentname changes, update agentid dynamically
            setAgent({
                agentname: value,
                agentid: value ? `AG#${generateRandomString()}` : "",
            });
        } else {
            setAgent({ ...agent, [name]: value });
        }
    };


    console.log("Agents",agent);
    

    const handleAddAgent = async() => {
       try{
        const payload = {
            agentName: agent.agentname, // Map `agentname` to `agentName`
            agent_id: agent.agentid,   // Map `agentid` to `agent_id`
          };
        const result =await axios.post('http://localhost:4001/addAgent',payload);
        console.log(result);
        
        if(result.status===201){
          alert("Agent Added SuccessFully");
          setAgent({agentname:"",agentid:""});
        }else{
            console.log("Error at Adding Agent");
        }
       }catch(err){
     console.log("Error at Catch in ADD AGENT::::",err);
     
       }
    };


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
                                            <div className="d-flex justify-content-between">
                                                <Col>
                                                    <h1 className="fw-bolder text-white mt-2 mb-3">
                                                        Add Agent
                                                    </h1>
                                                </Col>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Form>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="text-white fw-semibold">Agent name</Form.Label>
                                                    <InputGroup hasValidation>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Enter Agent name"
                                                            name="agentname"
                                                            value={agent.agentname}
                                                            onChange={handleChange}
                                                            className="fw-semibold"
                                                            required
                                                        />
                                                        <Form.Control.Feedback type="invalid" style={{ fontSize: "20px" }}>
                                                            Agent name is required.
                                                        </Form.Control.Feedback>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="text-white fw-semibold">Agent ID</Form.Label>
                                                    <InputGroup hasValidation>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Generated Agent ID"
                                                            name="agentid"
                                                            value={agent.agentid}
                                                            readOnly
                                                            className="fw-semibold"
                                                        />
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                            <Col className="d-flex align-items-center text-end justify-content-end">
                                                <RenderButton
                                                    variant="primary"
                                                    type="button"
                                                    title="Add"
                                                    onClick={handleAddAgent}
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
    );
}

export default AddAgent;
