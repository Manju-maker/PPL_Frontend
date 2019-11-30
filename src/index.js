import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './project/App';
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
//import Formcomponent from "./project/formcomponent"


//ReactDOM.render(<Formcomponent />, document.getElementById('root'));

 ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
