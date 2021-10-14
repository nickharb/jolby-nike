import React, { Component } from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Header, Nav} from "../"

/* Just hard-coding the Locker page */
function Locker() {
  return (
    <>
     <Header></Header>
     <Nav></Nav>
     <div className="Locker content-wrapper">
       <div className="profile">
        <h1>Duncan Doughnut</h1>
        <p>saved projects:
        <br></br>Lorem ipsum dolor sin amet</p>
       </div>
       <div className="saved-content">
          
       </div>
     </div>
    </>
  );
}

export default Locker
