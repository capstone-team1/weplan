import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchAllGroups} from '../store/index'
import {CreateGroup, GroupCard} from './index'
import {Segment} from 'semantic-ui-react'

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
              <Link to={`/group/${id}`} key={name}>
                <Segment>
                  <GroupCard
                    name={name}
                    description={description}
                    groupId={id}
                  />
                </Segment>
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
