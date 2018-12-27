import React, { PureComponent } from 'react';
import { TAB, TAB_NAME } from 'Utils/Api';
import { NavLink, withRouter } from 'react-router-dom';
import styles from './TabBar.css';

class TabBar extends PureComponent {
  render() {
    return (
      <div className={styles.bar}>
        <NavLink className={styles.item} to={`/`} exact>
          全部
        </NavLink>
        {Object.keys(TAB).map((key, index) => {
          if (key === 'all') return '';
          return (
            <NavLink
              className={styles.item}
              to={`/topics/${key}`}
              exact
              key={index}
            >
              {TAB_NAME[key]}
            </NavLink>
          );
        })}
      </div>
    );
  }
}

export default withRouter(TabBar);
