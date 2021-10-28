import React, { Component } from 'react';
import logo from './img/logo.svg'; 
import flag from './img/flag.svg';


import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function Header() {
  /* DATE HANDLING */
  Date.prototype.today = function () { 
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      return (days[this.getDay()] + " " + (months[this.getMonth()]) + " " +  this.getDate() +" " + this.getFullYear());
  }
  /* END DATE HANDLING */


  return (
    <div className="header">
      <div className="header-left">
        <div className="logo-image">
          <img src={logo} alt="Logo" />
        </div>
        <a href="/">NIKE FUTURE PORTAL APP</a>
      </div>
      <div className="header-right">
        <span>{new Date().today()}</span>
        <div className="flag-image">
          <img src={flag} alt="Location" />
        </div>
      </div>
    </div>
  );
}

export default Header
