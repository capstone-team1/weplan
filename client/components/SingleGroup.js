import React, {Component} from 'react'
import {connect} from 'react-redux'
import {AllEvents} from './index'
import {fetchSingleGroup} from '../store/index'

class SingleGroup extends Component {
  async componentDidMount() {
    console.log('asdsa')
    let userId = this.props.userId
    let groupId = this.props.group.id
    await this.props.fetchSingleGroup(userId, groupId)
  }
  render() {
    return (
      <div>
        <AllEvents />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  group: state.groupReducer.group,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  fetchSingleGroup: (userId, groupId) =>
    dispatch(fetchSingleGroup(userId, groupId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleGroup)
