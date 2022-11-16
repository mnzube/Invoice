import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  getInvoices?: any;
  getInvoicesLoading?: boolean;
  getInvoicesError?: any;
  createInvoice?: boolean;
  createInvoiceLoading?: boolean;
  createInvoiceError?: any;
  action?: boolean;
  message?: boolean;
}

const initialState: InitialState = {};

const invoiceSlice = createSlice({
  name: "Invoice",
  initialState,
  reducers: {
    setInvoices: (state, action: PayloadAction<any>) => ({
      ...state,
      getInvoices: action.payload,
    }),
    setInvoicesLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      getInvoicesLoading: action.payload,
    }),
    setInvoicesError: (state, action: PayloadAction<any>) => ({
      ...state,
      getInvoicesError: action.payload,
    }),
    setCreateInvoice: (state, action: PayloadAction<boolean>) => ({
      ...state,
      createInvoice: action.payload,
    }),
    setCreateInvoiceLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      createInvoiceLoading: action.payload,
    }),
    setCreateInvoiceError: (state, action: PayloadAction<any>) => ({
      ...state,
      createInvoiceError: action.payload,
    }),
    setAction: (state, action: PayloadAction<boolean>) => ({
      ...state,
      action: action.payload,
    }),
  },
});

const {
  setInvoices,
  setInvoicesError,
  setInvoicesLoading,
  setCreateInvoice,
  setCreateInvoiceError,
  setCreateInvoiceLoading,
  setAction,
} = invoiceSlice.actions;

export const invoiceReducer = invoiceSlice.reducer;

export {
  setInvoices,
  setInvoicesError,
  setInvoicesLoading,
  setCreateInvoice,
  setCreateInvoiceError,
  setCreateInvoiceLoading,
  setAction,
};
