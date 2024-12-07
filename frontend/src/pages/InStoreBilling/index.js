import React, { useEffect, useState } from 'react'
import { Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { retrieve_item } from '../../redux/actions/items.action';
import Select from "react-select";
import { RenderButton } from '../../component/Button';
import { create_invoice } from '../../redux/actions/billing.action';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { FaTrash } from "react-icons/fa";


export const InStoreBilling = () => {

    const [items, setItems] = useState([]);
    const [option,setOption] = useState([]);
    const [selectDropDown, setSelectDropDown] = useState([]);
    const [selectItems, setSelectItems] = useState([]);
    const [total,setTotal] = useState(0)
    const [validated, setValidated] = useState(false);
    const [payment, setPayment] = useState();
    const [order, setOrder] = useState();

    const [storeBillingData,setStoreBillingData] = useState({
        MobileNumber:"",
        Name:"",
    })

    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(()=>{
        __fetchItems()
    },[])
    
    useEffect(() => {
        __searchingBar(option);
    }, [option]);

    const __fetchItems = () => {
        try {
            dispatch(retrieve_item())
                .then((response) => {
                    setItems(response.data);
                    setOption(response.data);
                })
                .catch((error) => {
                    console.log("error : ", error);
                });
        } catch (error) {
            console.log("__fetchItems Catch block error : ", error);
        }
    };
    
    const __searchingBar = (data) => {

        if (data) {
            let searchingArr = [{ value: "", label: "Select Item" }];
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                console.log(data)
                searchingArr.push({
                    value: element.item_code,
                    label: `${element.item_name} - ${element.item_code}`,
                });
            }
            setSelectDropDown(searchingArr);
        } else {
            <p>loading</p>
        }
    };
    
    const __changeSearchingDropDownValue = (e) => {
        if (e.value !== "") {
            let filter = items.filter((item) => {
                return item.item_code === e.value;
            });
            setSelectItems([...selectItems, ...filter]);

            filter.map((item,i) =>{
                let new_totall = total + item.offer_price
                return (
                    setTotal(new_totall)    
                )
            })
        } else {
            __fetchItems();
        }
    };

    
    const handleChange = (e) => {
        setStoreBillingData({ ...storeBillingData, [e.target.name]: e.target.value });
    };
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            console.log("Please fill in all required fields.");
            return;
        }
    
        setValidated(true);
    
        const selectItemsModified = selectItems.map((item) => {
            const { item_hsb, item_image, ...rest } = item;
            return rest;
        });
    
        const formData = new FormData();
        formData.append("cx_phone_number", storeBillingData.MobileNumber);
        formData.append("cx_name", storeBillingData.Name);
        formData.append("price", total);
        formData.append("payment_mode", payment);
        formData.append("item_details", JSON.stringify(selectItemsModified));
    
        try {
            const res = await dispatch(create_invoice(formData));
            if (res.success === true) {
                swal({
                    title: "Your order was successful...",
                    text: res.data.message,
                    icon: "success",
                    showConfirmButton: false,
                });
                // Redirect to orders page after a brief delay
                setTimeout(() => {
                    navigate("/orders");
                }, 2000);
            } else {
                swal({
                    title: "Oops, something went wrong!",
                    text: res.data.message,
                    icon: "error",
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
    
    

        const handleDelete = (key) =>{
            setTotal(total - selectItems[key].offer_price)
            const deleteVal = [...selectItems]
            deleteVal.splice(key,1)
            setSelectItems(deleteVal)
        }
        
    return (
        <React.Fragment>
            <div className='d-flex align-items-center p-5'>
                <Container>
                    <Row>
                        <Col md={12} className='d-flex align-items-center justify-content-center' >
                            <div className='card w-100 inbiling_main'>
                                    <Row>
                                        <Col md={12}>
                                            <h1 className="fw-bolder text-white mt-2 mb-3">In Store Billing </h1>
                                        </Col>
                                    </Row>
                                    <Form noValidate validated={validated}>
                                        <Row>
                                            <Col md={7}>
                                                <Form.Group className="mb-3" controlId="validationCustom01">
                                                    <InputGroup hasValidation>
                                                        <input type='text' name='Name' onChange={(e)=>handleChange(e)} className='form-control' placeholder='Customer Name'  required/>
                                                        <Form.Control.Feedback type="invalid" style={{fontSize:"20px"}}>
                                                            Customer name is required.
                                                        </Form.Control.Feedback>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                            <Col md={7}>
                                                <Form.Group className="mb-3" controlId="validationCustom01">
                                                    <InputGroup hasValidation>
                                                        <input type='number' name='MobileNumber' onChange={(e)=>handleChange(e)} className='form-control' placeholder='Customer Mob.num'  required/>
                                                        <Form.Control.Feedback type="invalid" style={{fontSize:"20px"}}>
                                                            Customer number is required.
                                                        </Form.Control.Feedback>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                            <Col md={7}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className='text-white fw-semibold'>Payment Mode</Form.Label>
                                                    <select className="form-select form-control" onChange={(e) => setPayment(e.target.value)} >
                                                        <option value="" selected disabled="disabled">Payment mode</option>
                                                        <option value="UPI">UPI</option>
                                                        <option value="Debit">Debit/Credit Card</option>
                                                        <option value="Cash">Cash</option>
                                                    </select>
                                                </Form.Group>
                                            </Col>
                                            
                                            <Col md={12}>
                                                <div className='form-group mb-md-3'>
                                                    <Form.Label className='text-white fw-semibold'>Add Item</Form.Label>
                                                    <Select 
                                                        isClearable="true"
                                                        isSearchable = "true"
                                                        onChange={__changeSearchingDropDownValue} 
                                                        options={selectDropDown} 
                                                    />
                                                </div>
                                            </Col>
                                            <Col md={12}>
                                                <div className='inbiling_inr mb-md-3 p-3 table-responsive'>
                                                    <table className='table text-center'>
                                                        <thead>
                                                            <tr>
                                                                <th>Item Code</th>
                                                                <th>Item Name</th>
                                                                <th>Item MRP</th>
                                                                <th>Discount</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        {
                                                            selectItems && (       
                                                                <>
                                                                    <tbody>
                                                                        {selectItems.map((item, key) => {
                                                                            return (
                                                                            <tr key={key}>
                                                                                <td>{item.item_code}</td>
                                                                                <td>{item.item_name}</td>
                                                                                <td>{item.offer_price}</td>
                                                                                <td>{item.discount}</td>
                                                                                <td onClick={()=>handleDelete(key)}><FaTrash className='icon' type='button'  /></td>
                                                                            </tr>)
                                                                        })}
                                                                    </tbody>
                                                                </>
                                                            )
                                                        }
                                                    </table>
                                                    {
                                                        selectItems.length > 0 && (
                                                            <div className='text-end'>
                                                                <h3>Total : {total}</h3>
                                                            </div>
                                                        )
                                                    }
                                                        
                                                </div>
                                            </Col>
                                            <Col md={12} className='text-end my-1'>
                                                <RenderButton
                                                    className={"m-1"}
                                                    variant={"primary"}
                                                    type={"button"}
                                                    title={"Confirm"}
                                                    onClick={handleSubmit}
                                                />
                                            </Col>
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