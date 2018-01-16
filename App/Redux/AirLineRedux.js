import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getAirLinesRequest: null,
  success: ['airlines'],
  failure: ['error']
})

export const AirLineTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  airlines: [],
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

export const request = (state) => state.merge({ fetching: true })

export const success = (state, { airlines }) =>
  state.merge({ fetching: false, error: null, airlines })

export const failure = (state, { error }) =>
  state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_AIR_LINES_REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure
})

/* ------------- Selectors ------------- */
