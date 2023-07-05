import axios from "axios";
import {data} from '../data';
import {foodData} from '../foodData';
export const getAllItems = () => (dispatch) => {
  // axios
  //   .get("/items/getAllItems")
  //   .then((res) => {
  //     console.log(res.data);
  //     dispatch({
  //       type: "GET_ITEMS_SUCCESS",
  //       payload: res.data,
  //     })
  //   }
  //   )
  //   .catch((e) => {
  //     dispatch({
  //       type: "GET_ITEMS_FAIL",
  //       payload: e.response.data.msg,
  //     });
  //   });
  dispatch({
    type: "GET_ITEMS_SUCCESS",
    payload: { covers:data, food:foodData}
  })
};
export const addItem = (item) => (dispatch, getState) => {
  dispatch({
    type: "ADD_ITEM",
    payload: item,
  });
};
export const saveItemForDetail = (item) => (dispatch) => {
  dispatch({
    type: "SAVE_ITEM_FOR_DETAIL",
    payload: item,
  });
};

export const deleteItem = (itemId) => (dispatch) => {
  dispatch({
    type: "DELETE_ITEM",
    payload: itemId,
  });
};

export const changeCartItemCount = (cartItems) => (dispatch) => {
  dispatch({
    type: "CHANGE_CART_ITEM_COUNT",
    payload: cartItems,
  });
};
export const saveTotalandAppliedPromo = (total, appliedPromo) => (dispatch) => {
  dispatch({
    type: "SAVE_TOTAL_APPLIED_PROMO",
    payload: { total, appliedPromo },
  });
};

export const sendEmail =
  (customerData, itemsOrdered, trackId) => (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = { customerData, itemsOrdered, trackId };
    const body = JSON.stringify(data);

    axios
      .post("/items/sendEmail", body, config)
      .then((res) => {
        if (res.data.msg === "emailSentSuccess") {
          dispatch({
            type: "EMAIL_SENT_STATUS",
            payload: res.data.msg,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: "EMAIL_SENT_STATUS",
          payload: err,
        });
      });
  };

export const saveData =
  (customerData, itemsOrdered, payer, trackId) => (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = { customerData, itemsOrdered, payer, trackId };

    const body = JSON.stringify(data);
    axios
      .post("/items/saveData", body, config)
      .then((res) => {
        if (res.data.msg === "success") {
          dispatch({
            type: "DATA_SAVE_STATUS",
            payload: res.data.msg,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: "DATA_SAVE_STATUS",
          payload: err,
        });
      });
  };
