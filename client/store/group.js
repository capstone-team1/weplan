import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_GROUPS = 'GET_GROUPS'
const SET_GROUP = 'SET_GROUP'

/**
 * ACTION CREATORS
 */
const gotGroups = groups => ({
  type: GET_GROUPS,
  groups
})

const createGroup = group => {
  return {
    type: SET_GROUP,
    group
  }
}
/**
 * THUNK CREATORS
 */

//needs changing
export const fetchAllGroups = userId => async dispatch => {
  const {data} = await axios.get(`/api/users/${userId}/groups`)
  //CG: This next line of code is silly :O
  const groups = data
  const action = gotGroups(groups)
  dispatch(action)
}

export const createOneGroup = userId => async dispatch => {
  try {
    const {data} = await axios.post(`/api/users/${userId}/createEvent`, event)
    const newGroup = data
    const action = createGroup(newGroup)
    dispatch(action)
  } catch (error) {
    console.error(error)
  }
}

//Initial State
const initialState = {
  groups: []
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GROUPS:
      return {...state, groups: action.groups}
    case SET_GROUP:
      return {
        ...state,
        groups: action.group
      }
    default:
      return state
  }
}
