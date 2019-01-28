import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_EVENTS = 'GET_EVENTS'
const SET_EVENT = 'SET_EVENT'
/**
 * INITIAL STATE
 */
const defaultEvent = {}

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

export const createOneEvent = event => async dispatch => {
  try {
    const {data} = await axios.post('/api/users/:uderId/createEvent', event)
    const newEvent = data
    const action = createEvent(newEvent)
    dispatch(action)
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultEvent, action) {
  switch (action.type) {
    case GET_EVENTS:
      return action.event
    case SET_EVENT:
      return action.event
    default:
      return state
  }
}
