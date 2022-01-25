import React, { Component } from 'react';
import logo from './img/logo.svg'; 
import flag from './img/flag.svg';
import pointer from './img/pointer.svg';


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

    /* TIME HANDLING */


    let date = new Date();
    let nowPortland = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false, timeZone:'America/Los_Angeles' });
    let nowNewYork = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false, timeZone:'America/New_York' });
    let nowLondon = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false, timeZone:'Europe/London' });
    let nowTaiwan = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false, timeZone:'Asia/Taipei' });


    function toggleClocks() {
        document.getElementById('clocks').classList.toggle('active');
    }


    return (
        <div className="header">
            <div className="header-left">
                <div className="logo-image">
                    <img src={logo} alt="Logo" />
                </div>
                <a href="/">NIKE GENESIS BETA</a>
            </div>
            <div className="header-right" onClick={toggleClocks}>

                <div className="clocks-container" id="clocks">
                    <img src={pointer} />
                    <div className="clock">
                        <h3>Portland</h3>
                        <h4>{nowPortland}</h4>
                        <p>PST</p>
                    </div>
                    <div className="clock">
                        <h3>New York</h3>
                        <h4>{nowNewYork}</h4>
                        <p>EST</p>
                    </div>
                    <div className="clock">
                        <h3>London</h3>
                        <h4>{nowLondon}</h4>
                        <p>BST</p>
                    </div>
                    <div className="clock">
                        <h3>Taiwan</h3>
                        <h4>{nowTaiwan}</h4>
                        <p>TWT</p>
                    </div>
                </div>
                
                <span>{new Date().today()}</span>
                <div className="flag-image">
                    <img src={flag} alt="Location" />
                </div>
            </div>
        </div>
    );
}

export default Header
