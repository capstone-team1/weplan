import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchGlobalGroups, joinIntoGroup} from '../store/index'
import {Button} from 'react-bootstrap'
import {GroupCard} from './index'

class JoinGroups extends Component {
  async componentDidMount() {
    await this.props.fetchGlobalGroups()
  }
  render() {
    let groups = this.props.groups
    return (
      <div>
        <div>
          {groups.map(({id, name, description}) => {
            return (
              <div key={id}>
                <GroupCard name={name} description={description} groupId={id} />
                <div>
                  <Button
                    onClick={() => this.props.joinIntoGroup(this.props.id, id)}
                  >
                    Join new group
                  </Button>
                </div>
              </div>
            )
          })}
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
  fetchGlobalGroups: () => dispatch(fetchGlobalGroups()),
  joinIntoGroup: (userId, groupId) => dispatch(joinIntoGroup(userId, groupId))
})

export default connect(mapStateToProps, mapDispatchToProps)(JoinGroups)
