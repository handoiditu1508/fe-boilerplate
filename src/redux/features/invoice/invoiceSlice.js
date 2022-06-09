import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import invoiceService from "../../../services/invoiceService";

const initialState = {
  invoices: [],
  loading: false,
  error: null
};

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(getAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAsync.fulfilled, (state, action) => {
        state.invoices = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(getAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAsync.fulfilled, (state, action) => {
        const index = state.invoices.findIndex(invoice => invoice.id === action.payload);
        if (index !== -1) {
          state.invoices.splice(index, 1);
        }
        state.error = null;
        state.loading = false;
      })
      .addCase(deleteAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const getAsync = createAsyncThunk(
  "invoice/getAsync",
  async () => {
    var invoices = await invoiceService.getInvoices();
    return invoices;
  }
);

export const deleteAsync = createAsyncThunk(
  "invoice/deleteAsync",
  async (id) => {
    await invoiceService.deleteInvoice(id);
    return id;
  }
);

export const selectInvoices = state => state.invoice.invoices;
export const selectInvoice = id => state => {
  const index = state.invoice.invoices.findIndex(invoice => invoice.id === id);
    return index !== -1
    ? state.invoice.invoices[index]
    : null;
}
export const selectLoading = state => state.invoice.loading;
export const selectError = state => state.invoice.error;

export default invoiceSlice.reducer;