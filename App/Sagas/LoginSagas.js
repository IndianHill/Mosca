import { put, call } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux';

// attempts to login
export function * login ({ username, password }) {
  if (password === '') {
    // dispatch failure
    yield put(LoginActions.loginFailure('WRONG'))
  } else {
    // dispatch successful logins
    yield put(LoginActions.loginSuccess(username))
  }
}

export function * twitterLogin (api) {
  // make the call to the api
  const response = yield call(api.twitterLogin)
  if (response.status) {
    // do data conversion here if needed
    yield put(LoginActions.loginSuccess(response.user));
  } else {
    yield put(LoginActions.loginFailure('WRONG'))
  }
}

export function * facebookLogin (api) {
  // make the call to the api
  const response = yield call(api.facebookLogin)

  if (response.status) {
    // do data conversion here if needed
    yield put(LoginActions.loginSuccess(response.user));
  } else {
    yield put(LoginActions.loginFailure('WRONG'))
  }
}

export function * googleLogin (api) {
  // make the call to the api
  const response = yield call(api.googleLogin)

  if (response.status) {
    // do data conversion here if needed
    yield put(LoginActions.loginSuccess(response.user));
  } else {
    yield put(LoginActions.loginFailure('WRONG'))
  }
}
