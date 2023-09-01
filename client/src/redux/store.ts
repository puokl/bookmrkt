import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import chatReducer from "./slices/chatSlice";
import imageReducer from "./slices/imageSlice";
import filterReducer from "./slices/filterSlice";

const rootReducer = {
  auth: authReducer,
  product: productReducer,
  chat: chatReducer,
  image: imageReducer,
  filter: filterReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
