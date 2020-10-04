import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './GithubContext';
import GithubReducer from './GithubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../types'

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }

  // dispatch a type to reducer 
  const [state, dispatch] = useReducer(GithubReducer, initialState)

  // search users
  const searchUsers = async (text) => {
    setLoading();

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    // dispatches the type of SEARCH_USERS with the data - paylod is the data we want to send 
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  }

  // get user
  const getUser = async (username) => {
    setLoading();

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    dispatch({
      type: GET_USER,
      payload: res.data
    })
  }

  // get repos 
  const getUserRepos = async (username) => {
    setLoading();

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data
    })
  }

  // clear users 
  const clearUsers = () => dispatch({ type: CLEAR_USERS })

  // set loading - dispatch has to have a type
  const setLoading = () => dispatch({ type: SET_LOADING })

  // have return Provider to wrap application in the provider 
  return <GithubContext.Provider
    value={{
      users: state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      searchUsers,
      clearUsers,
      getUser,
      getUserRepos
    }} 
    >
    { props.children }
  </GithubContext.Provider>

}

export default GithubState