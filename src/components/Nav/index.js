import React, { Component } from 'react';
import borderline from './img/border.svg'; 

import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function Nav() {

  return (

  <div className="nav">
    <div className="border-line">
     <img src={borderline} alt="Logo" />
    </div>

    <div className="main-menu">
      <ul>
        <li><a href="/Dashboard">HOME</a></li>
        <li><a href="/Projects">PROJECTS</a></li>
        <li><a href="/Wip">WIP</a></li>
        <li><a href="/People">PEOPLE</a></li>
        <li><a href="/Locker">LOCKER</a></li>
      </ul>
    </div>
  </div>

  );
}

export default Nav
