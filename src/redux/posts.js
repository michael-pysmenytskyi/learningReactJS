import { GET_POSTS, ADD_POST } from '../constants/actionTypes'

const defaultStore = {
  items: []
};

export default (state = defaultStore, action) => {
  const {
    type,
    payload
  } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        items: [...payload]
      };

    case ADD_POST:
      return {
        ...state,
        items: [...state.items, ...[payload]] // add new post to other
      };

    default:
      return state;
  }
}