import {
  ADD_USER,
  GET_USER_DATA_LOADING,
  GET_USER_DATA_FAIL,
  GET_USER_DATA,
  GET_USERS_FAIL,
  GET_USERS_SUCCESSFULL,
  ADD_USER_SUCCESSFULL,
  ADD_USER_FAIL,
  UPDATE_USER,
  UPDATE_USER_SUCCESSFULL,
  UPDATE_USER_FAIL
} from './actionTypes'
import axios from 'axios'
const apiKey = process.env.REACT_APP_API_KEY
const apiUrl = process.env.REACT_APP_BASE_URL
const createHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
  }
}

const addUser = (userInputValue) => {
  return async (dispatch) => {
    dispatch({
      type: ADD_USER,
    })
    await fetch(`${apiUrl}/translations`, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify({
        username: userInputValue,
        translate: [],
      }),
    })
      .then((res) => {
        dispatch({
          type: ADD_USER_SUCCESSFULL,
          payload: true,
        })
        localStorage.setItem('user', userInputValue)
      })
      .catch((err) => {
        dispatch({
          type: ADD_USER_FAIL,
        })
      })
  }
}

const Logout = () => {
  return (dispatch) => {
    dispatch({
      type: ADD_USER_FAIL,
    })
  }
}

const GetUserData = (UserName) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_USER_DATA_LOADING,
      })
      const data = await axios.get(
        `${apiUrl}/translations?username=${UserName}`
      )
      dispatch({
        type: GET_USER_DATA,
        payload: data.data,
      })
    } catch (error) {
      dispatch({
        type: GET_USER_DATA_FAIL,
      })
    }
  }
}

const GetUsers = () => {
  return async (dispatch) => {
    try {
      const data = await axios.get(`${apiUrl}/translations`)
      dispatch({
        type: GET_USERS_SUCCESSFULL,
        payload: data.data,
      })
    } catch (error) {
      dispatch({
        type: GET_USERS_FAIL,
      })
    }
  }
}



const UpdateUser = (object) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_USER,
    })
    await fetch(`${apiUrl}/translations/${object.id}`, {
      method: 'PATCH',
      headers: createHeaders(),
      body: JSON.stringify({
        translate: object.translate,
      }),
    })
      .then((res) => {
        dispatch({
          type: UPDATE_USER_SUCCESSFULL,
          payload: true,
        })
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_USER_FAIL,
        })
      })
}}

export { addUser, GetUsers, GetUserData, Logout ,UpdateUser}
