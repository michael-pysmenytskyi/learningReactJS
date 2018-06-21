import { SET_USERS, DELETE_USERS, CHANGE_LOGIN, GET_MY_PROFILE } from '../constants/actionTypes'

const defaultStore = {
  items: [],
  currentUser: {}
};

export default (state = defaultStore, action) => {
  const {
    type,
    payload
  } = action;

  switch (type) {
    case SET_USERS:
      return {
        ...state,
        items: [...payload]
      };
      case GET_MY_PROFILE:
          return {
              ...state,
              currentUser: [...payload]
          };
    case CHANGE_LOGIN:
      return {
        ...state,
        currentUser: { ...payload.user }
      };
    case DELETE_USERS:
      return {
        ...state,
        items: state.items.filter((el) => {
          return el._id !== payload
        })
      };

    default:
      return state;
  }
}