export const hideSearchAndBackTopBtn = (decision) => {
  const backTopBtn = document.getElementById("back-to-top");
  const searchBar = document.getElementById("search-bar-container");
  if (decision) {
    backTopBtn.style.display = "none";
    searchBar.style.display = "none";
  } else {
    backTopBtn.style.display = "block";
    searchBar.style.display = "flex";
  }
};

// validation for ship address
export const validateFields = (shipMethod, email, postalCode) => {
  let err = "";
  let decision = false;

  // check if any field is empty
  let fieldLen = 0;
  if (shipMethod === "delivery") {
    const fields = ["fullname", "street", "city", "postalcode", "email"];
    for (let i = 0; i < fields.length; i++) {
      if (document.getElementsByName(fields[i])[0].value.length < 5) {
        err = fields[i];
        fieldLen++;
      } else {
        fieldLen--;
      }
    }
  } else if (shipMethod === "pickup") {
    fieldLen = -5;
  }

  //check for postal code
  const pattern =
    /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
  let isPostalOk = pattern.test(postalCode);
  if (!isPostalOk && shipMethod === "delivery") {
    err = "postalCode";
  }
  let isEmailOk = email.endsWith("@gmail.com") || email.endsWith("@yahoo.com");
  if (!isEmailOk) {
    err = "Only gmail and yahoo emails,Email";
  }
  if (fieldLen === -5 && isPostalOk && isEmailOk) {
    decision = true;
  } else if (fieldLen === -5 && isEmailOk && shipMethod === "pickup") {
    decision = true;
  } else {
    decision = false;
  }

  return { err, decision };
};

// calculate subtotal
export const calcuateSubTotal = (cartItems) => {
  let price = cartItems.map((item) => {
    let discount = 0;
    if (item.discount) {
      discount = (item.discount * item.price) / 100;
    }
    const itemPrice = item.price - discount;
    return Number(itemPrice) * item.count;
  });

  let subTotal = 0;
  for (let i = 0; i < price.length; i++) {
    subTotal = subTotal + price[i];
  }
  return subTotal;
};

// changing item count in cart
export const changeItemCount = (itemId, dec, cartItems) => {
  const currentItem = cartItems.filter((item) => item._id === itemId);
  let JUMP = 0;
  if (currentItem[0].price > 2) {
    JUMP = 1;
  } else {
    JUMP = 10;
  }
  let prevC = currentItem[0].count;
  let quantity = currentItem[0].quantity_in_stock;
  if (prevC === 1 && dec === 0 && JUMP === 1) {
    alert("Quantity cannot be less than 1 or Delete the item");
    return;
  }
  if (prevC === 10 && dec === 0 && JUMP === 10) {
    alert("Quantity cannot be less than 10 or Delete the item");
    return;
  }

  let newCount = dec ? prevC + JUMP : prevC - JUMP;
  if (newCount >= quantity) {
    newCount = quantity;
    alert(`Sorry! we don't have more than ${quantity} pieces`);
  }

  //updating in state

  const updatedCartItems = cartItems.map((item) => {
    if (item._id === itemId) {
      item.count = newCount;
    }
    return item;
  });
  return updatedCartItems;
};

// search bar
export const searchWord = (word, coversArr, foodArr) => {
  if (word.length < 3) {
    return "no match";
  } else {
    const dataArr1 = coversArr.map((cover) => {
      return cover.name.toLowerCase();
    });
    const dataArr2 = foodArr.map((food) => {
      return food.name.toLowerCase();
    });
    const dataArr = dataArr1.concat(dataArr2);
    const cases = [
      "case",
      "cases",
      "iphone",
      "i phone",
      "phone",
      "guards",
      "guard",
      "mobile",
      "cover",
      "covers",
      "screen",
      "protectors",
    ];
    const food = ["food", "foods", "snacks", "snack", "churan", "papad"];
    let reqItems = [];

    for (let i = 0; i < cases.length; i++) {
      let result = word.toLowerCase().search(cases[i]);
      if (result !== -1) {
        reqItems = dataArr1;
      }
    }
    for (let i = 0; i < food.length; i++) {
      let result = word.toLowerCase().search(food[i]);
      if (result !== -1) {
        reqItems = dataArr2;
      }
    }
    for (let i = 0; i < dataArr.length; i++) {
      let result = dataArr[i].search(word.toLowerCase());
      if (result !== -1) {
        reqItems.push(dataArr[i]);
      }
    }
    return reqItems;
  }
};

// set image function for images in item detail component
export const setImgFunc = (id, item) => {
  if (id === "1") document.getElementById("image-open").src = item.img1;
  if (id === "2") document.getElementById("image-open").src = item.img2;
  if (id === "3") document.getElementById("image-open").src = item.img3;
};

// function used in shipDetail component for selecting shipping method
export const selectShipMethodFunc = (option, e) => {
  e.target.style.backgroundColor = "black";
  e.target.style.color = "white";
  const deliveryBtn = document.getElementById("delivery");
  const pickupBtn = document.getElementById("pickup");
  if (option === "pickup") {
    deliveryBtn.style.backgroundColor = "white";
    deliveryBtn.style.color = "black";
  } else if (option === "delivery") {
    pickupBtn.style.backgroundColor = "white";
    pickupBtn.style.color = "black";
  }
  document.querySelector("#select-ship-method>h3").style.display = "none";
};
