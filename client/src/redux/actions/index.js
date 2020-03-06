import * as cn from "../actionTypes";

export const getCart = () => {
  return {
    type: cn.GET_CART
  };
};

export const addToCart = licensedBeat => {
  return {
    type: cn.ADD_TO_CART,
    payload: licensedBeat
  };
};

export const removeFromCart = beatId => {
  return {
    type: cn.REMOVE_FROM_CART,
    payload: beatId
  };
};
