import React from 'react';
import {render} from 'react-dom';

import Router from './router';
import './style/main.css'

const App = () => {
    return (
        <Router/>
    )
} 

render(
    <App/>,
    document.getElementById('app')
);
