import React, { useState } from "react";
import Draggable from "react-draggable";
import "./draggablepopup.css";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../redux/actions/draggableModalAction";
import { updateShoppingList } from "../../services/api_services";
import swal from "sweetalert";

const DraggablePopup = () => {
  const dispatch = useDispatch();
  const showPopUpState = useSelector((state) => state.modalReducer.showModal);
  const modalDataState = useSelector(
    (state) => state.modalReducer.modalData?.data
  );
  const [isCheckboxChanged, setIsCheckboxChanged] = useState(false);

  if (!showPopUpState) return;

  const handlePopupClosebtn = () => {
    setIsCheckboxChanged(false);
    dispatch(hideModal());
  };
  const handleCheckboxChange = () => {
    setIsCheckboxChanged(true);
  };

  const handleContinue = async () => {
    const { status } = await updateShoppingList(modalDataState?._id);
    if (status != 200) return alert("error in updation");

    swal({
      title: "update sucessfully...",
      icon: "success",
    });
    handlePopupClosebtn();
  };

  return (
    <Draggable handle=".draggablepopup-wrapper">
      <div className="draggablepopup-wrapper">
        <button onClick={handlePopupClosebtn}>close</button>
        <div className="draggablepopup-content">
          <div className="draggablepopup-image-container">
            <img src={modalDataState?.list_image_url} alt="" />
          </div>
          <div className="draggablepopup-details">
            <h5 className="m-0">{`Name: ${modalDataState?.cx_name}`}</h5>
            <h5 className="m-0">{`Phone Number: ${modalDataState?.cx_phone_number}`}</h5>
            <div className="d-flex align-items-center gap-3">
              <label htmlFor="draggablepopup-details-checkbox">
                Mark as done
              </label>
              <input
                id="draggablepopup-details-checkbox"
                type="checkbox"
                defaultChecked={modalDataState?.is_done}
                onChange={handleCheckboxChange}
              />
            </div>
            <button
              className={`${
                isCheckboxChanged
                  ? "draggablepopup-details-button"
                  : "draggablepopup-details-disabledbutton"
              }`}
              disabled={!isCheckboxChanged}
              onClick={handleContinue}
            >
              Confirm and continue
            </button>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default DraggablePopup;
