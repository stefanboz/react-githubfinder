import {
  SEARCH_USERS,
  GET_USER,
  CLEAR_USERS,
  GET_USER_REPOS,
  SET_LOADING,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        searchMatchesFound: action.payload.length ? true : false,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case GET_USER_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false,
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false,
      };
    default:
      return state;
  }
};
