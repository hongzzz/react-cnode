import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class About extends PureComponent {
  static propTypes = {
    match: PropTypes.object
  };
  render() {
    return (
      <div>
        <div>About..{this.props.match.params.id}</div>
        <div>add fff</div>
      </div>
    );
  }
}

export default About;
