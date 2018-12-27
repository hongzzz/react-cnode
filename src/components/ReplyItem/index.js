import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import UserAvatar from 'Com/UserAvatar';
import { Link } from 'react-router-dom';
import { dateDiff } from 'Utils/Time';

import styles from './ReplyItem.css';

class ReplyItem extends PureComponent {
  static propTypes = {
    reply: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
  };

  render() {
    const { reply, index } = this.props;
    return (
      <li className={styles.item}>
        <div className={styles.profile}>
          <UserAvatar
            className={styles.avatar}
            name={reply.author.loginname}
            avatarUrl={reply.author.avatar_url}
          />
          <Link
            className={styles.name}
            to={`/user/${reply.author.loginname}`}
            title={reply.author.loginname}
          >
            {reply.author.loginname}
          </Link>
        </div>
        <article
          className={`${styles.article} markdown-body`}
          dangerouslySetInnerHTML={{ __html: reply.content }}
        />
        <span className={styles.floor}>{index + 1}楼</span>
        <span className={styles.time}>{dateDiff(reply.create_at)}</span>
        {/*<span className={styles.up}>{reply.ups.length}</span>*/}
      </li>
    );
  }
}

export default ReplyItem;
