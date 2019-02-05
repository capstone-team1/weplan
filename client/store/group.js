import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_GROUPS = 'GET_GROUPS'
const GET_SINGLE_GROUP = 'GET_SINGLE_GROUP'
const SET_GROUP = 'SET_GROUP'
const REMOVE_GROUP = 'REMOVE_GROUP'
const GET_GLOBAL_GROUPS = 'GET_GLOBAL_GROUPS'
const JOIN_GROUP = 'JOIN_GROUP'

/**
 * ACTION CREATORS
 */

const joinGroup = group => ({
  type: JOIN_GROUP,
  groupId: group.id
})
const gotGroups = groups => ({
  type: GET_GROUPS,
  groups
})

const gotSingleGroup = group => ({
  type: GET_SINGLE_GROUP,
  group
})

const setGroup = group => {
  return {
    type: SET_GROUP,
    group
  }
}
const gotGlobalGroup = groups => {
  return {
    type: GET_GLOBAL_GROUPS,
    groups
  }
}

const removeGroup = group => ({
  type: REMOVE_GROUP,
  groupId: group.id
})

/**
 * THUNK CREATORS
 */

export const fetchAllGroups = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}/groups`)
    dispatch(gotGroups(data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchGlobalGroups = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/groups/join`)
    dispatch(gotGlobalGroup(data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchSingleGroup = (userId, groupId) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}/groups/${groupId}`)
    dispatch(gotSingleGroup(data))
  } catch (err) {
    console.error(err)
  }
}

export const createGroup = (userId, group) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/users/${userId}/groups`, group)
    dispatch(setGroup(data))
  } catch (err) {
    console.error(err)
  }
}

export const removeSingleGroup = (groupId, userId) => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(
        `/api/users/${userId}/groups/${groupId}`
      )
      dispatch(removeGroup(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const joinIntoGroup = (userId, groupId) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/users/${userId}/groups/${groupId}`)
      dispatch(joinGroup(data))
    } catch (err) {
      console.error(err)
    }
  }
}

//Initial State
const initialState = {
  groups: [],
  group: {}
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GROUPS:
      return {...state, groups: action.groups}
    case GET_SINGLE_GROUP:
      return {...state, group: action.group}
    case SET_GROUP:
      return {...state, groups: [...state.groups, action.group]}
    case REMOVE_GROUP:
      return {
        ...state,
        groups: state.groups.filter(group => group.id !== action.groupId)
      }
    case GET_GLOBAL_GROUPS:
      return {...state, groups: action.groups}
    case JOIN_GROUP:
      return {
        ...state,
        groups: state.groups.filter(group => group.id !== action.groupId)
      }
    default:
      return state
  }
}
