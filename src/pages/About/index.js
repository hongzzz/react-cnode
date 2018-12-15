import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import logo from '@/bg.jpg';

class About extends PureComponent {
  static propTypes = {
    match: PropTypes.object
  }
  render() {
    return (
      <div>
        <div>About..{this.props.match.params.id}</div>
        <div>add fff</div>
        <img src={logo} alt="logo"/>
      </div>
    );
  }
}

export default About;