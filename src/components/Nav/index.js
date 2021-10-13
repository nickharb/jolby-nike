import React, { Component } from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function Nav() {



  return (
    <div className="main-menu">
      <ul>
        <li><a href="">HOME</a></li>
        <li><a href="">PROJECTS</a></li>
        <li><a href="">WIP</a></li>
        <li><a href="">PEOPLE</a></li>
        <li><a href="">LOCKER</a></li>
      </ul>
    </div>
  );
}

export default Nav
