import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_EVENTS = 'GET_EVENTS'
const SET_EVENT = 'SET_EVENT'
/**
 * INITIAL STATE
 */

/**
 * ACTION CREATORS
 */
const gotEvents = events => ({
  type: GET_EVENTS,
  events
})

const createEvent = event => {
  return {
    type: SET_EVENT,
    event
  }
}
/**
 * THUNK CREATORS
 */

export const fetchAllEvents = (userId, groupId) => async dispatch => {
  const {data} = await axios.get(`/api/users/${userId}/`)
  const events = data
  const action = gotEvents(events)
  dispatch(action)
}

export const createOneEvent = (userId, event) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/users/${userId}/createEvent`, event)
    const newEvent = data
    const action = createEvent(newEvent)
    dispatch(action)
  } catch (error) {
    console.error(error)
  }
}

const initialState = {
  events: []
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS:
      return {...state, events: action.event}
    case SET_EVENT:
      return {
        ...state,
        events: [action.event]
      }
    default:
      return state
  }
}
