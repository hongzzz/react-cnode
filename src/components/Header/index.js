import React, {PureComponent} from 'react';
import {NavLink, withRouter} from "react-router-dom";

import styles from './Header.css';

class Header extends PureComponent {
  render() {
    return (
      <header className={styles.header}>
        <NavLink className={styles.link} exact to="/">Home</NavLink>
        <NavLink className={styles.link} exact to="/about">About</NavLink>
        <NavLink className={styles.link} exact to="/about/99">About</NavLink>
        <NavLink className={styles.link} exact to="/xxx">xx</NavLink>
      </header>
    );
  }
}

export default withRouter(Header);