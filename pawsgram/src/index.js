import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Nav from './Nav'
import NewButton from "./NewButton";
import TimelinePage from "./TimelinePage";

ReactDOM.render(<TimelinePage />, document.getElementById('root'))
ReactDOM.render(<NewButton />, document.getElementById('newButton'))
ReactDOM.render(<Nav />, document.getElementById('navbar'))