const SET_USER_INFO = 'SET_USER_INFO';
const RESET_USER_INFO = 'RESET_USER_INFO';

export const setUserInfo = userInfo => ({
  type: SET_USER_INFO,
  payload: userInfo
});

export const resetUserInfo = () => ({
  type: SET_USER_INFO
});

const cnodeUser = localStorage.getItem('cnode_user');
let initialState = cnodeUser ? JSON.parse(cnodeUser) : null;

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER_INFO:
      localStorage.setItem('cnode_user', JSON.stringify(action.payload));
      return action.payload;
    case RESET_USER_INFO:
      localStorage.removeItem('cnode_user');
      return null;
    default:
      return state;
  }
}
