const SET_TOKEN = 'SET_TOKEN';
const RESET_TOKEN = 'RESET_TOKEN';

export const setToken = userInfo => ({
  type: SET_TOKEN,
  payload: userInfo
});

export const resetToken = () => ({
  type: RESET_TOKEN
});

const cnodeToken = localStorage.getItem('cnode_token');
let initialState = cnodeToken ? cnodeToken : null;

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      localStorage.setItem('cnode_token', action.payload);
      return action.payload;
    case RESET_TOKEN:
      localStorage.removeItem('cnode_token');
      return null;
    default:
      return state;
  }
}
