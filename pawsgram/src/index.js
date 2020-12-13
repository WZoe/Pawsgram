import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import Nav from './Nav'
import NewButton from "./NewButton";

ReactDOM.render(<App />, document.getElementById('root'))
ReactDOM.render(<NewButton />, document.getElementById('newButton'))
ReactDOM.render(<Nav />, document.getElementById('navbar'))