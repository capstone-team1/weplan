import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllGroups} from '../store/index'

class UserGroups extends React.Component {
  async componentDidMount() {
    let userId = this.props.id
    await this.props.fetchAllGroups(userId)
  }
  render() {
    //CG: Get in the habit of standardizing destructuring.
    let groups = this.props.groups
    return (
      <div>
        {groups.map(group => { //CG: Make this into a separate GroupCard component.
          return (
            <tr key={group.id}>
              <p>Group Name:{group.name}</p>
              <p>Group Description:{group.description}</p>
            </tr>
          )
        })}
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
