import { combineReducers } from 'redux';
import user from './user';
import token from './token';

const root = combineReducers({
  user,
  token
});

export default root;
