import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllGroups} from '../store/index'
import GroupCard from './GroupCard'

class UserGroups extends Component {
  async componentDidMount() {
    let userId = this.props.id
    await this.props.fetchAllGroups(userId)
  }
  render() {
    //CG: Get in the habit of standardizing destructuring.
    let groups = this.props.groups
    return (
      <div>
        {groups.map(({name, description}, i) => {
          return <GroupCard name={name} description={description} key={i} />
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
