import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchGlobalGroups, joinIntoGroup} from '../store/index'
import {GroupCard} from './index'
import {Segment, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class JoinGroups extends Component {
  async componentDidMount() {
    await this.props.fetchGlobalGroups()
  }

  render() {
    let groups = this.props.groups
    return (
      <div>
        {groups.map(({id, name, description}) => {
          return (
            <Segment key={name}>
              <GroupCard name={name} description={description} groupId={id} />
              <Button
                onClick={() => this.props.joinIntoGroup(this.props.id, id)}
              >
                Join group
              </Button>
            </Segment>
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
  fetchGlobalGroups: () => dispatch(fetchGlobalGroups()),
  joinIntoGroup: (userId, groupId) => dispatch(joinIntoGroup(userId, groupId))
})

export default connect(mapStateToProps, mapDispatchToProps)(JoinGroups)
