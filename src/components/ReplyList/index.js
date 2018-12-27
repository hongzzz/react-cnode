import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReplyItem from 'Com/ReplyItem';

import styles from './ReplyList.css';

class ReplyList extends PureComponent {
  static propTypes = {
    replies: PropTypes.array.isRequired
  };

  render() {
    const { replies } = this.props;
    return (
      <ul className={styles.replies}>
        {replies.map((item, index) => (
          <ReplyItem reply={item} index={index} key={index} />
        ))}
      </ul>
    );
  }
}

export default ReplyList;
