import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class List extends PureComponent {
  static propTypes = {
    arr: PropTypes.array
  };

  render() {
    return (
      <div>
        {this.props.arr.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    );
  }
}

export default List;
