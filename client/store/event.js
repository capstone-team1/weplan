import axios from 'axios'
import {runInNewContext} from 'vm'

/**
 * ACTION TYPES
 */
const GET_EVENTS = 'GET_EVENTS'
const GET_SINGLE_EVENT = 'GET_SINGLE_EVENT'
const SET_EVENT = 'SET_EVENT'
const DELETE_EVENT = 'DELETE_EVENT'
const UPDATE_EVENT_VOTE = 'UPDATE_EVENT_VOTE'
const DECIDE_EVENT = 'DECIDE_EVENT'

/**
 * ACTION CREATORS
 */
//CG: These are probably setters as they're being called from thunks.
const gotEvents = events => ({
  type: GET_EVENTS,
  events
})

const gotEvent = event => ({
  type: GET_SINGLE_EVENT,
  event
})

const setEvent = event => {
  return {
    type: SET_EVENT,
    event
  }
}

const deleteEvent = event => {
  return {
    type: DELETE_EVENT,
    event
  }
}

const updateEventVote = event => {
  return {
    type: UPDATE_EVENT_VOTE,
    event: event.data
  }
}

const choseEvent = event => {
  return {
    type: DECIDE_EVENT,
    event
  }
}

/**
 * THUNK CREATORS
 */

export const fetchAllEvents = (userId, groupId) => async dispatch => {
  const {data} = await axios.get(
    `/api/users/${userId}/groups/${groupId}/events`
  )
  dispatch(gotEvents(data))
}

export const fetchSingleEvent = (userId, eventId) => async dispatch => {
  const {event} = await axios.get(`/api/users/${userId}/events/${eventId}/`)
  dispatch(gotEvent(event))
}

export const createEvent = (userId, groupId, event) => async dispatch => {
  try {
    const {data} = await axios.post(
      `/api/users/${userId}/groups/${groupId}/events`,
      event
    )
    dispatch(setEvent(data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteSingleEvent = (userId, eventId) => async dispatch => {
  try {
    const event = await axios.delete(`/api/users/${userId}/events/${eventId}/`)
    const action = deleteEvent(event)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

export const changeEventVote = (userId, eventId, vote) => async dispatch => {
  try {
    const event = await axios.put(`/api/users/${userId}/events/${eventId}/`, {
      vote
    })

    const action = updateEventVote(event)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

export const decideEvent = groupId => async dispatch => {
  try {
    const group = await axios.put(`/api/users/:groupId/decideEvent/`)
  } catch (err) {
    console.error(err)
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
      return {...state, events: action.events}
    case GET_SINGLE_EVENT:
      return {...state, singleEvent: action.event}
    case SET_EVENT:
      return {
        ...state,
        events: [...state.events, action.event]
      }
    case DELETE_EVENT:
      return {
        ...state,
        events: [
          ...state.events.filter(event => {
            return event.id !== action.event.id
          })
        ],
        singleEvent:
          state.singleEvent.id !== action.event.id ? state.singleEvent : {}
      }
    case UPDATE_EVENT_VOTE:
      return {
        ...state,
        events: [
          ...state.events
            .filter(event => {
              return event.id !== action.event.id
            })
            .concat(action.event)
        ],
        singleEvent:
          state.singleEvent.id !== action.event.id ? state.singleEvent : event
      }
    default:
      return state
  }
}
