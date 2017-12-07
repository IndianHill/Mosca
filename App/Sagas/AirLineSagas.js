import { put, call } from 'redux-saga/effects'
import AirLineActions from '../Redux/AirLineRedux';

export function * getAirLines (api) {
  // make the call to the api
  const response = yield call(api.getAirLines)
  if (response.status) {
    // do data conversion here if needed
    yield put(AirLineActions.success(response.airlines));
  } else {
    yield put(AirLineActions.failure('WRONG'))
  }
}