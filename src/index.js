import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';

import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";
import AddDefect from "./Components/AddDefect";
import ViewDefect from "./Components/ViewDefect";
import Review from './Components/Review';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <BrowserRouter>
        <React.Fragment>
            <Route path='/' component={LoginForm} exact />
            <Route path='/RegisterForm' component={RegisterForm} />
            <Route path='/Review' component={Review} />
            <Route path='/AddDefect' component={AddDefect} />
            <Route path='/ViewDefect' component={ViewDefect} />
        </React.Fragment>
    </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
