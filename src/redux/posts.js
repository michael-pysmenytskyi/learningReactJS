import { SET_POSTS, DELETE_POSTS } from '../constants/actionTypes'

const defaultStore = {
  items: []
};

export default (state = defaultStore, action) => {
  const {
    type,
    payload
  } = action;

  switch (type) {
    case SET_POSTS:
      return {
        ...state,
        items: [...payload]
      };
    case DELETE_POSTS:
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