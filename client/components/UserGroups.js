import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchAllGroups, removeSingleGroup} from '../store/index'
import {CreateGroup, GroupCard} from './index'
import {Button} from 'react-bootstrap'

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
              <div key={name}>
                <Link to={`/group/${id}`}>
                  <GroupCard name={name} description={description} />
                </Link>
                <Button
                  onClick={() =>
                    this.props.removeSingleGroup(id, this.props.id)
                  }
                >
                  Delete Group
                </Button>
              </div>
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
