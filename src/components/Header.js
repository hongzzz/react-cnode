import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import './Header.less';

class Header extends Component {
  render() {
    return (
      <header>
        <NavLink className="link" exact to="/">Home</NavLink>
        <NavLink className="link" exact to="/about">About</NavLink>
        <NavLink className="link" exact to="/xxx">xx</NavLink>
      </header>
    );
  }
}

export default Header;