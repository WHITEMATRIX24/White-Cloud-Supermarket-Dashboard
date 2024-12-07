import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import VegitablesThree from "../../assets/images/vegetables-three.jpg";
import { useDispatch } from "react-redux";
import { Delete_item, retrieve_item, retrieve_all_items } from "../../redux/actions/items.action";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { RenderButton } from "../../component/Button";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import ReactLoading from 'react-loading';
import { faEdit, faTrash } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from "sweetalert";


export const Stock = () => {
    const [items, setItems] = useState([]);
    const [allitems, setAllItems] = useState([]);
    const [selectValue,setSelectValue] = useState([])
    const [selectDropDown, setSelectDropDown] = useState([]);
    const [loading,setLoading] = useState(true)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        __fetchItems();
    }, []);

    const [page, setPage] = useState(1); // Add a new state variable for the current page

const __fetchItems = () => {
    try {
        dispatch(retrieve_item()) // Pass the current page and items per page to the API
            .then((response) => {
                //console.log("response.data", response.data);
                setItems(prevItems => [...prevItems, ...response.data]); // Append the new items to the existing items
                //setPage(prevPage => prevPage + 1); // Increment the page number for the next request
                __searchingBar(response.data);
                setTimeout(() => {
                    setLoading(false)
                }, 500);
                __fetchItemStock();
            })
            .catch((error) => {
                console.error(error);
            });
    } catch (err) {
        console.log(err);
    }
};
    
const __fetchItemStock = () => {
    try {
        dispatch(retrieve_all_items())
            .then((response) => {
                setAllItems(response.data);
                setItems(response.data.reverse());
                setSelectValue(response.data);
                __searchingBar(response.data);
                setTimeout(() => {
                    setLoading(false)
                }, 500);
            })
            .catch((error) => {
                console.log("error : ", error);
            });
    } catch (error) {
        console.log("__fetchItems Catch block error : ", error);
    }
};

const __clickStockReportPDF = async (e) => {
    //await __fetchItemStock();
    if (allitems.length > 0) {
        let body = [];
        allitems.forEach((item) => {
            body.push([
                item.item_code,
                item.item_name,
                item.stock_quantity
            ]);
        });

        const doc = new jsPDF();
        autoTable(doc, {
            head: [['Item Code', 'Item Name', 'Stock Quantity']],
            body: body,
        });
        doc.save('table.pdf');
    }
};

    const __searchingBar = (data) => {
        //console.log("data __searchingBar : ", data);
        let searchingArr = [{ value: "", label: "Select Item" }];
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            searchingArr.push({
                value: element.item_code,
                label: `${element.item_name} - ${element.item_code}`,
            });
        }
        setSelectDropDown(searchingArr);
    };  
    
    const __changeSearchingDropDownValue = (e) => {
        if (e.value !== "") {
            let filter = selectValue.filter((item) => {
                return item.item_code === e.value;
            });
            setItems([...filter]);
        } else {   
            __fetchItems();
        }
    };

    const __navigateItem = (code) => {
        navigate(`/add-item/${code}`);
    };

    const deleteItem = (code) =>{
        //console.log('index stock code', code);
        const formData = new FormData()
        formData.append("id", code);
        //console.log('formData', formData);

            swal({
                title: "Are you sure?",
                text: "you sure want to delete this item?'",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then(willDelete =>{
                    if (willDelete) {
                        //dispatch(Delete_item(formData))
                        dispatch(Delete_item(code))
                        .then((response) => {
                            swal({
                                title: "Done!",
                                text: "item is deleted",
                                icon: "success",
                                timer: 2000,
                                showConfirmButton: false,
                                button: (navigate('/')),
                                })
                                __fetchItems();
                        })
                        .catch((error) => {
                            console.log("error : ", error);
                        });
                    }
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
                                            <div className="d-flex align-items-center justify-content-between">
                                            <h1 className="fw-bolder text-white mt-2 mb-3">Stock</h1>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <div className="stocks-list">
                                                <Row>
                                                    <Col md={12}>
                                                        <div className="form-group mb-md-3">
                                                            <Select
                                                                isClearable="true"
                                                                isSearchable = "true"
                                                                onChange={__changeSearchingDropDownValue}
                                                                options={selectDropDown}
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row className="justify-content-start">

                                                  {
                                                    (loading === true)?(<ReactLoading type={'spinningBubbles'} color={'#fff'} delay={'1'} height={'20%'} width={'6%'} className='loader' />) :(
                                                        <>
                                                         {items.map((item, key) => {
                                                            return (
                                                                <Col md={2} key={key}>
                                                                        <div className="item" >
                                                                            <div>
                                                                                <div className="product_img">
                                                                                    {(item.item_image) ? (<img src={`data:image/jpeg;base64,${item.item_image}`}   alt='productimg' />):(<img src={VegitablesThree} alt='productimg' />) }
                                                                                </div>
                                                                                <p className="price">{item.offer_price}/-</p>
                                                                                <h2>{item.item_name.length > 0 ? item.item_name : 'Item name'}</h2>
                                                                                <p className="item_code">{item.item_code}</p>
                                                                            </div>
                                                                            <div className="text-end">
                                                                                <FontAwesomeIcon className="mx-2" onClick={() => {__navigateItem(item._id)}} icon={faEdit} />
                                                                                <FontAwesomeIcon onClick={() => {deleteItem(item._id)}} icon={faTrash} />
                                                                            </div>
                                                                        </div>
                                                                </Col>
                                                            );
                                                         })}  
                                                        </>
                                                    )
                                                  }  
                                                
                                                </Row>
                                                {/*<button onClick={__fetchItems}>Load more items</button>*/}
                                                <Row>
                                                    <Col
                                                        md={12}
                                                        className="d-flex align-items-center justify-content-end"
                                                    >
                                                        <RenderButton
                                                            variant={"primary"}
                                                            type={"button"}
                                                            title={"Stock Report"}
                                                            onClick={__clickStockReportPDF}
                                                        />
                                                    </Col>
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
    );
};
