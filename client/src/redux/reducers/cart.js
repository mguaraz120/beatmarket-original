import * as cn from "../actionTypes";

const initialState = {
  items: []
};

const cartReducer = (state = initialState.items, action) => {
  switch (action.type) {
    case cn.GET_CART:
      return [...state];

    case cn.ADD_TO_CART:
      let item = action.payload;
      return [...state, item];

    case cn.REMOVE_FROM_CART:
      const id = action.payload;
      return state.filter(item => item.beat._id !== id);

    default:
      return state;
  }
};

export default cartReducer;
