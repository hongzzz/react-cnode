import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Api from 'Utils/Api';
import TopicList from 'Com/TopicList';
import UserAvatar from 'Com/UserAvatar';
import { Skeleton, message } from 'antd';
import { dateDiff } from 'Utils/Time';
import styles from './User.css';

class User extends PureComponent {
  static propTypes = {
    match: PropTypes.object
  };

  state = {
    avatarUrl: '',
    createAt: '',
    name: '',
    githubName: '',
    score: 0,
    topics: [],
    replies: [],
    loading: true
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.name !== this.props.match.params.name) {
      this.setState({ loading: true });
      this.getData();
      window.scrollTo(0, 0);
    }
  }

  getData = async () => {
    try {
      const { name } = this.props.match.params;
      let res = await Api.getUserInfo(name);
      this.setState({
        avatarUrl: res.avatar_url,
        createAt: res.create_at,
        name: res.loginname,
        githubName: res.githubUsername,
        score: res.score,
        topics: res.recent_topics,
        replies: res.recent_replies,
        loading: false
      });
    } catch (e) {
      message.error(e.error_msg);
    }
  };

  renderHoldItems() {
    const arr = Array(5).fill(0);
    return arr.map((item, index) => (
      <Skeleton
        className="holdItem"
        avatar
        title={false}
        paragraph={{ rows: 2 }}
        key={index}
      />
    ));
  }

  render() {
    const { name } = this.props.match.params;
    const {
      createAt,
      avatarUrl,
      githubName,
      score,
      topics,
      replies,
      loading
    } = this.state;
    return (
      <div>
        <div className="container">
          {loading ? (
            <Skeleton className="holdItem" avatar />
          ) : (
            <div className={styles.info}>
              <UserAvatar name={name} avatarUrl={avatarUrl} />
              <span className={styles.item}>{name}</span>
              <span className={styles.item}>积分{score}</span>
              <span className={styles.item}>{dateDiff(createAt)}</span>
              {githubName && (
                <a
                  className={styles.github}
                  href={`https://github.com/${githubName}`}
                >
                  {githubName}
                </a>
              )}
            </div>
          )}
        </div>
        <div className="container">
          <h1 className={styles.title}>最近创建话题</h1>
          {loading ? this.renderHoldItems() : <TopicList topics={topics} />}
        </div>
        <div className="container">
          <h1 className={styles.title}>最近回复话题</h1>
          {loading ? this.renderHoldItems() : <TopicList topics={replies} />}
        </div>
      </div>
    );
  }
}

export default User;
