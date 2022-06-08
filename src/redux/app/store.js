import authenticationReducer from "../features/authentication/authenticationSlice";
import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "../features/invoice/invoiceSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    invoice: invoiceReducer
  }
});