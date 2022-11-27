import {
  ADD_USER,
  ADD_USER_SUCCESSFULL,
  ADD_USER_FAIL,
  GET_USERS,
  GET_USERS_SUCCESSFULL,
  GET_USERS_FAIL,
  DELETE_ITEM,
  GET_USER_DATA,
  GET_USER_DATA_FAIL,
  GET_USER_DATA_LOADING,
} from '../actionsTypes/actionTypes'

const initialState = {
  users: {
    loading: false,
    data: {},
    error: {},
  },
  UserDataUpdate: {
    loading: false,
    data: {},
    error: {},
  },
  userData: {
    data: {},
    loading: false,
    error: '',
  },
  addUser: {
    loading: false,
    data: false,
    error: {},
  },
  updateUser: {
    loading: false,
    data: {},
    error: {},
  },
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // ADD USER CASES
    case ADD_USER:
      return {
        ...state,
        addUser: {
          loading: true,
          data: false,
          error: false,
        },
      }
    case ADD_USER_SUCCESSFULL:
      return {
        ...state,
        addUser: {
          loading: false,
          data: action.payload,
          error: false,
        },
      }
    case ADD_USER_FAIL:
      return {
        ...state,
        addUser: {
          loading: false,
          data: false,
          error: true,
        },
      }

    // GET ALL USER CASES
    case GET_USERS:
      return {
        ...state,
        users: {
          loading: true,
          data: {},
          error: {},
        },
      }
    case GET_USERS_SUCCESSFULL:
      return {
        ...state,
        users: {
          loading: false,
          data: action.payload,
          error: {},
        },
      }
    case GET_USERS_FAIL:
      return {
        ...state,
        users: {
          loading: false,
          data: {},
          error: true,
        },
      }
    // GET USER DATA CASES
    case GET_USER_DATA_LOADING:
      return {
        ...state,
        userData: {
          data: {},
          loading: true,
          error: false,
        },
      }
    case GET_USER_DATA:
      return {
        ...state,
        userData: {
          data: action.payload[0],
          loading: false,
          error: false,
        },
      }
    case GET_USER_DATA_FAIL:
      return {
        ...state,
        userData: {
          data: {},
          loading: false,
          error: true,
        },
      }
    // DELETE USER ITEM
    case DELETE_ITEM:
      return {
        ...state,
        numOfItems: state.numOfItems - 1,
      }
    // UPDATE USER
    case GET_USER_DATA_LOADING:
      return {
        ...state,
        UserDataUpdate: {
          loading: true,
          data: {},
          error: {},
        },
      }
    case GET_USER_DATA:
      return {
        ...state,
        UserDataUpdate: {
          loading: false,
          data: action.payload,
          error: {},
        },
      }
    case GET_USER_DATA_FAIL:
      return {
        ...state,
        UserDataUpdate: {
          loading: false,
          data: {},
          error: true,
        },
      }
    default:
      return state
  }
}

export default userReducer
