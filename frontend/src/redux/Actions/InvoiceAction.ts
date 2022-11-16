import axios from "axios";
import {
  setCreateInvoice,
  setCreateInvoiceError,
  setCreateInvoiceLoading,
  setInvoicesLoading,
  setInvoices,
  setInvoicesError,
  setAction,
} from "../Slices/InvoiceSlice";
import { Dispatch } from "@reduxjs/toolkit";

export const getInvoicesAction =
  (status?: string) => async (dispatch: Dispatch) => {
    dispatch(setInvoicesLoading(true));

    try {
      const res = await axios.get(
        status ? `/invoice/?status=${status}` : "/invoice"
      );
      dispatch(setInvoicesLoading(false));
      dispatch(setInvoices(res.data.data));
    } catch (e: any) {
      dispatch(setInvoicesLoading(false));
      dispatch(setInvoicesError(e.response.data));
    }
  };

export const createInvoicesAction =
  (values: any) => async (dispatch: Dispatch) => {
    dispatch(setCreateInvoiceLoading(true));

    try {
      const res = await axios.post("/invoice", values);
      dispatch(setCreateInvoiceLoading(false));
      dispatch(setCreateInvoice(res.data.data));
      dispatch(setAction(true));
    } catch (e: any) {
      dispatch(setCreateInvoiceLoading(false));
      dispatch(setCreateInvoiceError(e.response.data));
    }
  };
