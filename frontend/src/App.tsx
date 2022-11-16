import React from "react";
import "./App.css";
import Router from "./components/Router";
import { RouterProvider } from "react-router-dom";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./redux//store";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URI;
(axios as any).defaults.headers = {
  Authorization: localStorage.getItem("token"),
};

function App() {
  return (
    <div className="App">
      <Provider store={store()}>
        <RouterProvider router={Router}></RouterProvider>
      </Provider>
    </div>
  );
}

export default App;
