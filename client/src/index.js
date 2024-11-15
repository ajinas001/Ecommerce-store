import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CartProvider } from './Components/context/CartContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <GoogleOAuthProvider clientId="1030894416145-5alutckd6rirt2l3vq6ug99643rante7.apps.googleusercontent.com">
     <Provider store={store}>
      <CartProvider>
    <App />
    </CartProvider>
    </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
