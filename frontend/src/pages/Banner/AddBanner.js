import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import React, { useEffect, useState } from 'react'
import { retrieve_item } from '../../redux/actions/items.action';
import { RenderButton } from "../../component/Button";
import { add_banner } from "../../redux/actions/items.action";

const AddBanner = () => {
    const [items, setItems] = useState([]);
    const [validated, setValidated] = useState(false);
    const [hsbFile,sethsbFile] = useState('')
    const [hsbPreview,setHasbPreview] = useState('')
    const [formFields, setFormFields] = useState({
        "item_code": '',
        "banner_img": '',
    })

    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(()=>{
      __fetchItems()
  },[])

  const __fetchItems = () => {
    try {
        dispatch(retrieve_item())
            .then((response) => {
                setItems(response.data);
            })
            .catch((error) => {
                console.log("error : ", error);
            });
    } catch (error) {
        console.log("__fetchItems Catch block error : ", error);
    }
};


    const __changeInputFields = (e) => {
        setFormFields({...formFields,[e.target.name]:e.target.value})
    }

    const __changeHsbImage = (e) => {
        sethsbFile(e.target.files[0])
        setHasbPreview(URL.createObjectURL(e.target.files[0]))
     }


    const  __handleSubmit = (e) =>{
        e.preventDefault();
        
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
          }

          setValidated(true);

        let formData = new FormData()
        formData.append("item_code", formFields?.item_code);
        formData.append("banner_img", hsbFile);

        console.log(formData);
        dispatch(add_banner(formData)).then(res =>{
            if (res.success === true) {
                swal({
                    title: "Banner added sucessfully...",
                    text: res.message,
                    icon: "success",
                    showConfirmButton: false,
                    button: (navigate('/banner')),
                  });
            } else {
                swal({
                    title: "Oops,Something went wrong!",
                    text: res.message,
                    icon: "error",
                  });
            }
        }).catch(err =>{
            console.log(err);
        })
    }

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
                      <h1 className="fw-bolder text-white mt-2 mb-3">
                        Add Banner
                      </h1>
                    </Col>
                  </Row>
                  <Form noValidate validated={validated}>
                    <Row>
                        { <Col md={6}>
                            {/*<Form.Group className="mb-3" controlId="validationCustom01">
                                <Form.Label className='text-white fw-semibold'>Item code</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control type="number" placeholder="Enter item code" name="item_code" onChange={(e) => __changeInputFields(e)}  className='fw-semibold' required />
                                    <Form.Control.Feedback type="invalid" style={{fontSize:"20px"}}>
                                        Item code is required.
                                    </Form.Control.Feedback>
                                </InputGroup>
                              </Form.Group>*/}
                            <Form.Group controlId="itemCode">
                              <Form.Label>Item Code</Form.Label>
                              <Form.Control as="select" name="item_code" onChange={__changeInputFields}>
                                {items.map(item => (
                                <option key={item.item_code} value={item.item_code}>
                                {item.item_code} {item.item_name} 
                              </option>
                                ))}
                              </Form.Control>
                            </Form.Group>
                        </Col> }
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="validationCustom01">
                                    <Form.Label className='text-white fw-semibold'>Banner Image</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control type="file" accept="image/png, image/gif, image/jpeg" placeholder="Select banner image" onChange={(e)=>__changeHsbImage(e)} className='fw-semibold' required/>
                                        <Form.Control.Feedback type="invalid" style={{fontSize:"20px"}}>
                                                Item tags is required.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                    {   (hsbPreview) &&
                                        <img src={hsbPreview} className='mt-3 border border-dark' height='150' width='150' alt='stock_img' />
                                    }
                                </Form.Group>
                            </Col>

                        </Row>
                        <Col className="d-flex align-items-center text-end justify-content-end">
                            <RenderButton 
                                variant={'primary'}
                                type={'submit'}
                                title={'Add'}
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
  );
};

export default AddBanner;
