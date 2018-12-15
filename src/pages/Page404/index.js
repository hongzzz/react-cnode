import React, {PureComponent} from 'react';
import {Link} from "react-router-dom";
import styles from './Page404.css';

class Page404 extends PureComponent {
  render() {
    return (
      <div className={styles.notFound}>
        <div className={styles.text}>404</div>
        <Link className={styles.link} to="/">Back To Home</Link>
      </div>
    );
  }
}

export default Page404;