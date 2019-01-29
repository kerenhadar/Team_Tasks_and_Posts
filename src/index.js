import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom'

import { Provider} from 'react-redux';
import mainReducer from './Redux/mainReducer';
import { createStore} from 'redux'; //no need to import 'combineReducers')
import axios from 'axios';
var url='https://jsonplaceholder.typicode.com/'

//build app-store , managed by mainReducer component
// mainReducer-function that will return a first store with data into appstore


//const appStore = 
const appStore = createStore(mainReducer); 
console.log("index.js")    
//Provider -  provides <app/> component with a store that is holded in appStore constant
//BrowserRouter - to change content dynamicaly
//<App/> - main component . has the root  element for rendering
ReactDOM.render(
<Provider store={appStore}> 
<BrowserRouter><App/></BrowserRouter>
</Provider>
, document.getElementById('root'));

//console.log("end of index.js")

serviceWorker.unregister();


