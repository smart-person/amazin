import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { cartReducer } from '../slice/CartSlice';
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMineListReducer,
  orderPayReducer
} from '../slice/OrderSlice';
import {
  productCategoryListReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productListAllReducer,
  productReviewCreateReducer,
  productUpdateReducer,
  currencyTypeReducer
} from '../slice/ProductSlice';
import {
  userAddressMapReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
  userSigninReducer,
  userTopSellerListReducer,
  userUpdateProfileReducer,
  userUpdateReducer
} from '../slice/UserSlice';
import { Storage } from '../utils';
import { KEY } from '../constants';

const preloadedState = {
  userSignin: { userInfo: Storage[KEY.USER_INFO] },
  cart: {
    cartItems: Storage[KEY.CART_ITEMS] || [],
    shippingAddress: Storage[KEY.SHIPPING_ADDRESS] || {},
    paymentMethod: 'PayPal'
  }
};

const store = configureStore({
  preloadedState,
  reducer: {
    currencyType: currencyTypeReducer,
    productList: productListReducer,
    productListAll: productListAllReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userUpdate: userUpdateReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userTopSellersList: userTopSellerListReducer,
    productCategoryList: productCategoryListReducer,
    productReviewCreate: productReviewCreateReducer,
    userAddressMap: userAddressMapReducer
  },
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;