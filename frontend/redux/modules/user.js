import {
  loadingState,
  loadedState,
  failState
} from './';

import createApiRequest, {
  tokenID
} from '../../utils/createApiRequest';

import {
  stashData, getData
} from '../../utils/stash';

export const FETCH_USER = 'user/FETCH_USER';
export const FETCH_USER_REQUEST = 'user/FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'user/FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'user/FETCH_USER_FAILURE';

export const CREATE_USER = 'user/CREATE_USER';
export const CREATE_USER_REQUEST = 'user/CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'user/CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'user/CREATE_USER_FAILURE';

const AUTH = 'auth/AUTH';
const AUTH_REQUEST = 'auth/AUTH_REQUEST';
const AUTH_SUCCESS = 'auth/AUTH_SUCCESS';
const AUTH_FAILURE = 'auth/AUTH_FAILURE';

const AUTH_VERIFY = 'auth/AUTH_VERIFY';
const AUTH_VERIFY_REQUEST = 'auth/AUTH_VERIFY_REQUEST';
const AUTH_VERIFY_SUCCESS = 'auth/AUTH_VERIFY_SUCCESS';
const AUTH_VERIFY_FAILURE = 'auth/AUTH_VERIFY_FAILURE';

const GET_STATUS_UPDATES = 'user/GET_STATUS_UPDATES';
const GET_STATUS_UPDATES_REQUEST = 'user/GET_STATUS_UPDATES_REQUEST';
const GET_STATUS_UPDATES_SUCCESS = 'user/GET_STATUS_UPDATES_SUCCESS';
const GET_STATUS_UPDATES_FAILURE = 'user/GET_STATUS_UPDATES_FAILURE';

const UPDATE_USER = 'user/UPDATE_USER';
const UPDATE_USER_REQUEST = 'user/UPDATE_USER_REQUEST';
const UPDATE_USER_SUCCESS = 'user/UPDATE_USER_SUCCESS';
const UPDATE_USER_FAILURE = 'user/UPDATE_USER_FAILURE';

export default function (state = {}, action) {
  const {
    type,
    response,
    err
  } = action;
  switch (type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        ...loadingState
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        ...loadedState,
        response
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        ...failState,
        err
      };
    case AUTH_VERIFY_REQUEST:
      return {
        ...state,
        ...loadingState
      };
    case AUTH_VERIFY_SUCCESS:
      return {
        ...state,
        ...loadedState,
        token: response.token,
        user: response.user
      };
    case AUTH_VERIFY_FAILURE:
      return {
        ...state,
        ...failState,
        err
      };
    case CREATE_USER_REQUEST:
      return {
        ...state,
        ...loadingState
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        ...loadedState,
        response
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        ...failState,
        err
      };
    case AUTH_REQUEST:
      return {
        ...state,
        ...loadingState
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        ...loadedState,
        response
      };
    case AUTH_FAILURE:
      return {
        ...state,
        ...failState,
        err
      };
    case GET_STATUS_UPDATES_REQUEST:
      return {
        ...state,
        ...loadingState
      };
    case GET_STATUS_UPDATES_SUCCESS:
      return {
        ...state,
        ...loadedState,
        statusUpdates: response
      };
    case GET_STATUS_UPDATES_FAILURE:
      return {
        ...state,
        ...failState,
        err
      };
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        ...loadingState
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        ...loadedState,
        user: response
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        ...failState,
        err
      };
    default:
      return state;
  }
}

export function fetchUserRequest(id) {
  return {
    type: FETCH_USER,
    promise: createApiRequest(`users/${id}`)
  };
}

export function createUserRequest({
  firstName,
  lastName,
  email,
  password
}) {
  return {
    type: CREATE_USER,
    promise: createApiRequest('users', 'POST', {
      firstName,
      lastName,
      email,
      password
    })
  };
}

function loginRequest({
  email,
  password
}) {
  return {
    type: AUTH,
    promise: createApiRequest('auth', 'POST', {
      email,
      password
    })
  };
}

export function loginHandler({
  email,
  password
}) {
  return async (dispatch) => {
    const response = await dispatch(loginRequest({
      email,
      password
    }));
    stashData(tokenID, response.response.token);
  };
}

export function fetchUserFromToken() {
  return {
    type: AUTH_VERIFY,
    promise: createApiRequest('auth/validate', 'POST', { token: getData(tokenID) })
  };
}

export function fetchStatusUpdatesRequest(id) {
  return {
    type: GET_STATUS_UPDATES,
    promise: createApiRequest(`users/${id}/statusUpdates`)
  };
}

export function updateUserRequest(id, user) {
  return {
    type: UPDATE_USER,
    promise: createApiRequest(`users/${id}`, 'POST', user)
  };
}
