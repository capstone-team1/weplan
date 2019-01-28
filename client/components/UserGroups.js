import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class UserGroups extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {}
  render() {
    return <div />
  }
}

const mapStateToProps = state => ({
  groups: state.groupReducer.group
})

const mapDispatchToProps = dispatch => ({
  fetchGroups: userId => dispatch(fetchGroups(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserGroups)
