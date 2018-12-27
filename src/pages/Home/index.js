import React, { PureComponent } from 'react';
import TabBar from 'Com/TabBar';
import TopicList from 'Com/TopicList';
import Api, { TAB } from 'Utils/Api';
import { message, Skeleton, Pagination } from 'antd';
import PropTypes from 'prop-types';
import styles from './Home.css';

class Home extends PureComponent {
  static propTypes = {
    match: PropTypes.object
  };
  state = {
    topics: [],
    loading: true,
    page: 1
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.tab !== this.props.match.params.tab) {
      this.setState({ loading: true, page: 1 });
      this.getData();
    }
  }

  getData = async () => {
    const { tab } = this.props.match.params;
    const { page } = this.state;
    try {
      let result = await Api.getTopics(page, tab ? tab : TAB.all);
      this.setState({
        topics: result,
        loading: false
      });
      console.log(result);
    } catch (e) {
      message.error(e.error_msg);
    }
  };

  changePage = page => {
    this.setState(
      {
        page
      },
      () => {
        window.scrollTo(0, 0);
        this.getData();
      }
    );
  };

  renderHoldItems() {
    const arr = Array(10).fill(0);
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
    const { topics, loading } = this.state;

    return (
      <div className="container">
        <TabBar />
        {loading ? this.renderHoldItems() : <TopicList topics={topics} />}
        <Pagination
          className={styles.pagination}
          onChange={this.changePage}
          pageSize={20}
          total={1000}
        />
      </div>
    );
  }
}

export default Home;
