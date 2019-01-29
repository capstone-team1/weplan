import React, {Component} from 'react'
import {connect} from 'react-redux'
import {AllEvents} from './index'
import {fetchSingleGroup} from '../store/index'

class SingleGroup extends Component {
  async componentDidMount() {
    let groupId = this.props.group.id
    let userId = this.props.user.id
    await this.props.fetchSingleGroup(userId, groupId)
  }
  render() {
    return <AllEvents />
  }
}

const mapStateToProps = state => ({
  group: state.groupReducer.group,
  user: state.user.id
})

const mapDispatchToProps = dispatch => ({
  fetchSingleGroup: (userId, groupId) =>
    dispatch(fetchSingleGroup(userId, groupId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleGroup)
