import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Login.css';
import { setUserInfo } from '@/redux/user';
import { setToken } from '@/redux/token';
import Api from 'Utils/Api';
import { message } from 'antd';

class Login extends PureComponent {
  static propTypes = {
    setUserInfo: PropTypes.func,
    setToken: PropTypes.func,
    userInfo: PropTypes.object,
    token: PropTypes.string
  };

  state = {
    token: ''
  };

  handleClick = async () => {
    try {
      let result = await Api.checkToken(this.state.token);
      this.props.setToken(this.state.token);
      this.props.setUserInfo(result);
    } catch (e) {
      message.error(e.error_msg);
    }
  };

  handleChange = e => {
    this.setState({
      token: e.target.value
    });
  };

  render() {
    return (
      <div>
        <input onChange={this.handleChange} type="text" />
        <button onClick={this.handleClick}>Login</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.user,
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  setUserInfo: userInfo => {
    dispatch(setUserInfo(userInfo));
  },
  setToken: token => {
    dispatch(setToken(token));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
