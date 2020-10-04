import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../types'

export default (state, action) => {
  switch(action.type) {
    case SEARCH_USERS:
      return {
        // return current state 
        ...state,
        // set the users data to the payload (res.data) - comign from dispatch
        users: action.payload,
        loading: false
      };
    case GET_USER:
      return {
        // reference the current state
        ...state,
        user: action.payload,
        loading: false 
      }
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false
      };
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false
      };
    case SET_LOADING:
      // want to return what is already in the state 
      // state is immutable - can't just reassign it
      return {
        // copies the state - and then make changes 
        ...state,
        loading: true
      };
    default: 
      return state
  }
}