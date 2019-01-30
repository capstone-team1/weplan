import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchAllGroups} from '../store/index'
import {CreateGroup, GroupCard} from './index'

class UserGroups extends Component {
  async componentDidMount() {
    let userId = this.props.id
    await this.props.fetchAllGroups(userId)
  }
  render() {
    let groups = this.props.groups
    return (
      <div>
        <div>
          {groups.map(({id, name, description}) => {
            return (
              <Link to={`/users/${this.props.id}/groups/${id}`} key={name}>
                <GroupCard name={name} description={description} groupId={id} />
              </Link>
            )
          })}
        </div>
        <div>
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
  fetchAllGroups: userId => dispatch(fetchAllGroups(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserGroups)
