import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_EVENT = 'GET_EVENT'
const CREATE_EVENT = 'CREATE_EVENT'
/**
 * INITIAL STATE
 */
const defaultEvent = {}

/**
 * ACTION CREATORS
 */
const gotSingleEvent = event => ({type: GET_EVENT, event})
const createdEventForServer = event => {
  return {
    type: CREATE_EVENT,
    event
  }
}
/**
 * THUNK CREATORS
 */

export const fetchSingleEvent = eventId => async dispatch => {
  const {data} = await axios.get(`/api/events/${eventId}`)
  const event = data
  const action = gotSingleEvent(event)
  dispatch(action)
}

export const createOneEvent = event => async dispatch => {
  try {
    const {data} = await axios.post('/api/events', event)
    const newEvent = data
    const action = createdEventForServer(newEvent)
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
    case GET_EVENT:
      return action.event
    case CREATE_EVENT:
      return action.event
    default:
      return state
  }
}
