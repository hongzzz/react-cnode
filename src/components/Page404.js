import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './Page404.less';

class Page404 extends Component {
  render() {
    return (
      <div className="page-404">
        <div className="text">404</div>
        <Link to="/">Back To Home</Link>
      </div>
    );
  }
}

export default Page404;