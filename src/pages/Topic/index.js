import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Api from 'Utils/Api';

import 'github-markdown-css';
import UserAvatar from 'Com/UserAvatar';
import ReplyList from 'Com/ReplyList';
import { message, Skeleton } from 'antd';
import { dateDiff } from 'Utils/Time';
import { Link } from 'react-router-dom';

import styles from './Topic.css';

class Topic extends PureComponent {
  static propTypes = {
    match: PropTypes.object
  };

  state = {
    topic: {},
    loading: true
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const { id } = this.props.match.params;
    try {
      let res = await Api.getTopic(id);
      this.setState({
        topic: res,
        loading: false
      });
    } catch (e) {
      message.error(e.error_msg);
    }
  };

  render() {
    const { topic, loading } = this.state;
    return (
      <div>
        <div className="container">
          {loading ? (
            <Skeleton className="holdItem" />
          ) : (
            <>
              <h1 className={styles.title}>{topic.title}</h1>
              <div className={styles.user}>
                <UserAvatar
                  name={topic.author.loginname}
                  avatarUrl={topic.author.avatar_url}
                />
                <Link
                  className={styles.item}
                  to={`/user/${topic.author.loginname}`}
                >
                  {topic.author.loginname}
                </Link>
                <span className={styles.item}>{dateDiff(topic.create_at)}</span>
                <span className={styles.item}>
                  {topic.reply_count}/{topic.visit_count}
                </span>
              </div>
              <article
                className={`${styles.article} markdown-body`}
                dangerouslySetInnerHTML={{ __html: topic.content }}
              />
            </>
          )}
        </div>
        {topic.replies && topic.replies.length !== 0 && (
          <div className="container">
            <ReplyList replies={topic.replies} />
          </div>
        )}
      </div>
    );
  }
}
export default Topic;
