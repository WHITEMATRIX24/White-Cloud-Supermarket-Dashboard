import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import "./shoppingList.css";
import { useDispatch } from "react-redux";
import { showModal } from "../../redux/actions/draggableModalAction";
import { getAllShoppingList } from "../../services/api_services";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [shoppingListData, setShoppingListData] = useState([]);

  const handleOpenModal = (shoppingList) => {
    dispatch(showModal({ data: shoppingList }));
  };

  const handleInitialShoppingListData = async () => {
    try {
      const shoppingList = await getAllShoppingList();
      setShoppingListData(shoppingList?.shoppingListData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleInitialShoppingListData();
  }, []);

  return (
    <>
      <div className="d-flex align-items-center p-5">
        <Container>
          <div className="shopping-list-container">
            {shoppingListData && shoppingListData?.length > 0 ? (
              <Table className="shopping-list-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>status</th>
                  </tr>
                </thead>
                <tbody>
                  {shoppingListData.map((shoppingList) => (
                    <tr
                      onClick={() => handleOpenModal(shoppingList)}
                      key={shoppingList._id}
                    >
                      <td>{shoppingList?.cx_name}</td>
                      <td>{shoppingList?.cx_phone_number}</td>
                      <td>
                        {shoppingList?.is_done ? "Completed" : "Not Completed"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No shopping data</p>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default ShoppingList;
