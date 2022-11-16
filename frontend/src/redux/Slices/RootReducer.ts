import { combineReducers } from "@reduxjs/toolkit";
import { invoiceReducer } from "./InvoiceSlice";

export const rootReducer = combineReducers({ invoices: invoiceReducer });
