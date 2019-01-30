import React, {Component} from 'react'
import {connect} from 'react-redux'
import {AllEvents} from './index'
import {fetchSingleGroup} from '../store/index'

class SingleGroup extends Component {
  async componentDidMount() {
    let userId = this.props.userId
    let groupId = this.props.groupId
    await this.props.fetchSingleGroup(userId, groupId)
  }
  render() {
    return (
      <div>
        <AllEvents groupId={this.props.groupId} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  fetchSingleGroup: (userId, groupId) =>
    dispatch(fetchSingleGroup(userId, groupId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleGroup)
