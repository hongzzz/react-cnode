import axios from 'axios';

const URL = {
  baseURL: 'https://cnodejs.org/api/v1',
  topics: '/topics',
  topic: id => `/topic/${id}`,
  userInfo: name => `/user/${name}`,
  token: '/accesstoken'
};

export const TAB = {
  all: 'all',
  good: 'good',
  ask: 'ask',
  share: 'share',
  job: 'job',
  dev: 'dev'
};

export const TAB_NAME = {
  all: '全部',
  good: '精华',
  ask: '问答',
  share: '分享',
  job: '招聘',
  dev: '测试',
  top: '置顶'
};

const Instance = axios.create({
  baseURL: URL.baseURL,
  timeout: 3000
});

// 错误处理
Instance.interceptors.response.use(
  function(response) {
    return response.data; // 获得响应体内容
  },
  function(error) {
    return Promise.reject(error.response.data);
  }
);

const Api = {
  async getTopics(page, tab) {
    let res = await Instance.get(URL.topics, {
      params: { page, limit: 20, tab, mdrender: false }
    });
    return res.data;
  },
  async getTopic(id, token) {
    let res = await Instance.get(URL.topic(id), {
      params: { mdrender: true, accesstoken: token }
    });
    return res.data;
  },
  async getUserInfo(name) {
    let res = await Instance.get(URL.userInfo(name));
    return res.data;
  },
  async checkToken(token) {
    let res = await Instance.post(URL.token, { accesstoken: token });
    return {
      name: res.loginname,
      avatarUrl: res.avatar_url,
      id: res.id
    };
  }
};

export default Api;
