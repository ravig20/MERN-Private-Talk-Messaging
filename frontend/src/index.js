import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'
import './index.css';
import App from './App';
import {Provider} from "react-redux"
import store from "./store"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
    <ChakraProvider>
    <App />
    </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
