import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './UserAvatar.css';

class UserAvatar extends PureComponent {
  static propTypes = {
    avatarUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string
  };

  render() {
    const { name, avatarUrl, className } = this.props;

    return (
      <Link
        className={`${styles.link}${className ? ' ' + className : ''}`}
        to={`/user/${name}`}
      >
        <img
          className={styles.avatar}
          src={avatarUrl}
          title={name}
          alt={name}
        />
      </Link>
    );
  }
}

export default UserAvatar;
