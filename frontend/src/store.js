import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productCreateReducer,
  productDeleteReducer,
  productDetailReducer,
  productListReducer,
  productUpdateReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userDeleteReducer,
  userDetailReducer,
  userListReducer,
  userUpdateReducer,
  userReducer,
} from "./reducers/userReducers";
import {
  orderCreateReducer,
  orderDetailReducer,
  orderPayReducer,
  orderListMyReducer,
  orderListReducer,
  orderDeliverReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderMyList: orderListMyReducer,
  orderList: orderListReducer,
  user: userReducer,
  userList: userListReducer,
  userDetail: userDetailReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
});

function getFromStorage(key, defaultVal = null) {
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : defaultVal;
}

const initialState = {
  cart: {
    cartItems: getFromStorage("cartItems", []),
    shippingAddress: getFromStorage("shippingAddress", {}),
  },
  user: { userInfo: getFromStorage("userInfo") },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
