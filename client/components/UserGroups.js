import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllGroups} from '../store/index'

class UserGroups extends React.Component {
  constructor(props) {
    super(props)
  }
  async componentDidMount() {
    let userId = this.props.userId
    await this.props.fetchAllGroups(userId)
  }
  render() {
    return (
      <div>
        <h1>works?</h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  groups: state.groupReducer.groups
})

const mapDispatchToProps = dispatch => ({
  fetchAllGroups: userId => dispatch(fetchAllGroups(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserGroups)
