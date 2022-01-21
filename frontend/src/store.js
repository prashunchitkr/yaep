import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productDetailReducer,
  productListReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userReducer } from "./reducers/userReducers";
import {
  orderCreateReducer,
  ordereetailReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
  user: userReducer,
  orderCreate: orderCreateReducer,
  orderDetails: ordereetailReducer,
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
