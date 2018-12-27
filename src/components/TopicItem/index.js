import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TAB_NAME } from 'Utils/Api';
import { dateDiff } from 'Utils/Time';

import UserAvatar from 'Com/UserAvatar';

import styles from './TopicItem.css';

class TopicItem extends PureComponent {
  static propTypes = {
    topic: PropTypes.object.isRequired
  };

  get showTabName() {
    const { topic } = this.props;
    if (topic.top) return TAB_NAME.top;
    if (topic.good) return TAB_NAME.good;
    return TAB_NAME[topic.tab];
  }

  render() {
    const { topic } = this.props;
    return (
      <li className={styles.item}>
        <UserAvatar
          className={styles.avatar}
          name={topic.author.loginname}
          avatarUrl={topic.author.avatar_url}
        />

        {topic.tab && (
          <span
            className={`${styles.tab}
          ${topic.top || topic.good ? 'highlight' : ''}`}
          >
            {this.showTabName}
          </span>
        )}

        <Link className={styles.title} to={`/topic/${topic.id}`}>
          {topic.title}
        </Link>

        {(topic.reply_count || topic.visit_count) && (
          <span className={styles.count}>
            {topic.reply_count}/{topic.visit_count}
          </span>
        )}

        <span className={styles.date}>{dateDiff(topic.last_reply_at)}</span>
      </li>
    );
  }
}

export default TopicItem;
