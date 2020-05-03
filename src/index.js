import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import burgerBuilderReducer from '../src/store/reducers/burgerBuilder';
//import {reducer as notificationsReducer} from 'reapop';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const defaultNotification = {
//     status: 'info',
//     position: 'tr',
//     dismissible: true,
//     dismissAfter: 2000,
//     allowHTML: true,
//     closeButton: true
//   };

const store = createStore(combineReducers(
    {
        burgerBuilder: burgerBuilderReducer,
        //notifications: notificationsReducer(defaultNotification)
    }), composeEnhancers(applyMiddleware(thunk)));



const app =  (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
