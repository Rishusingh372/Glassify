// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// // import 'bootstrap/dist/css/bootstrap.min.css';
//   import { ToastContainer} from 'react-toastify';

// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//     <ToastContainer  autoClose={2000} />
//   </StrictMode >,
// )

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer} from 'react-toastify';
import App from "./App";
import { store, persistor } from "./app/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <ToastContainer autoClose={2000} />
    </PersistGate>
  </Provider>
);
