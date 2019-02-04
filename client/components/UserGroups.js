import React, {Component} from 'react'

import {connect} from 'react-redux'
import {fetchAllGroups, removeSingleGroup} from '../store/index'
import {CreateGroup, GroupCard} from './index'
import {Segment, Button} from 'semantic-ui-react'

class UserGroups extends Component {
  async componentDidMount() {
    let userId = this.props.id
    await this.props.fetchAllGroups(userId)
  }
  render() {
    let {groups} = this.props
    return (
      <div>
        <div>
          {groups.map(({id, name, description}) => {
            return (
              <Segment key={name}>
                <GroupCard name={name} description={description} groupId={id} />
              </Segment>
            )
          })}
        </div>
        <div>
          <h3>Create A Group!</h3>
          <CreateGroup />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  groups: state.groupReducer.groups,
  id: state.user.id
})

const mapDispatchToProps = dispatch => ({
  fetchAllGroups: userId => dispatch(fetchAllGroups(userId)),
  removeSingleGroup: (groupId, userId) =>
    dispatch(removeSingleGroup(groupId, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserGroups)
