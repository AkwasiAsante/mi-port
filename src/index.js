import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
const theme = createTheme();

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);