import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TopicItem from 'Com/TopicItem';

import styles from './TopicList.css';

class TopicList extends PureComponent {
  static propTypes = {
    topics: PropTypes.array.isRequired
  };

  render() {
    const { topics } = this.props;
    return (
      <ul className={styles.topics}>
        {topics.map((item, index) => (
          <TopicItem topic={item} key={index} />
        ))}
      </ul>
    );
  }
}

export default TopicList;
