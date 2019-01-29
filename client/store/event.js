import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_EVENTS = 'GET_EVENTS'
const GET_SINGLE_EVENT = 'GET_SINGLE_EVENT'
const SET_EVENT = 'SET_EVENT'

/**
 * ACTION CREATORS
 */
//CG: These are probably setters as they're being called from thunks.
const gotEvents = events => ({
  type: GET_EVENTS,
  events
})

const gotEvent = singleEvent => ({
  type: GET_SINGLE_EVENT,
  singleEvent
})

const setEvent = event => {
  return {
    type: SET_EVENT,
    event
  }
}
/**
 * THUNK CREATORS
 */

//needs changing
export const fetchAllEvents = (userId, groupId) => async dispatch => {
  const {data} = await axios.get(`/api/users/${userId}/`)
  const events = data
  const action = gotEvents(events)
  dispatch(action)
}

export const fetchSingleEvent = (userId, eventId) => async dispatch => {
  const event = await axios.get(`/api/users/${userId}/events/${eventId}/`)
  const action = gotEvent(event)
  dispatch(action)
}

//CG: Call this createEvent
export const createEvent = (userId, event) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/users/${userId}/events`, event)
    const newEvent = data
    const action = setEvent(newEvent)
    dispatch(action)
  } catch (error) {
    console.error(error)
  }
}

//Initial State
const initialState = {
  events: [],
  singleEvent: {}
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS:
      return {...state, events: action.event}
    case GET_SINGLE_EVENT:
      return {...state, singleEvent: action.singleEvent}
    case SET_EVENT:
      return {
        ...state,
        events: action.event
      }
    default:
      return state
  }
}
