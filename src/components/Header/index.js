import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import UserAvatar from 'Com/UserAvatar';
import logo from './cnodejs.svg';
import styles from './Header.css';

class Header extends PureComponent {
  static propTypes = {
    userInfo: PropTypes.object
  };
  render() {
    const { userInfo } = this.props;
    return (
      <>
        <header className={styles.header}>
          <Link className={styles.link} to="/">
            <img className={styles.logo} src={logo} />
          </Link>
          {userInfo ? (
            <UserAvatar
              className={styles.login}
              avatarUrl={userInfo.avatarUrl}
              name={userInfo.name}
            />
          ) : (
            <Link className={styles.link} to="/login">
              Login
            </Link>
          )}
        </header>
        <div className={styles.holdPlace} />
      </>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.user
});

export default connect(mapStateToProps)(Header);
