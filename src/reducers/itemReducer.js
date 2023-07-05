const initialState = {
  foodItems: [],
  coverItems: [],
  carItems: [],
  itemForDetail: {},
  cartItems: [],
  total: 0,
  promos: ["40OFF"],
  appliedPromo: "",
  emailSentStatus: false,
  shipMethod: "",
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ITEMS_SUCCESS":
      return {
        ...state,
        foodItems: action.payload.food,
        coverItems: action.payload.covers,
      };
    case "ADD_ITEM":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case "DELETE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload
        ),
      };
    case "CHANGE_CART_ITEM_COUNT":
      return {
        ...state,
        cartItems: action.payload,
      };
    case "SAVE_TOTAL_APPLIED_PROMO":
      return {
        ...state,
        total: action.payload.total,
        appliedPromo: action.payload.appliedPromo,
      };
    case "SAVE_ITEM_FOR_DETAIL":
      return {
        ...state,
        itemForDetail: action.payload,
      };
    case "EMAIL_SENT_STATUS":
      return {
        ...state,
        emailSentStatus: true,
      };

    default:
      return state;
  }
};

export default itemReducer;
