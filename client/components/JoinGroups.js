import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchGlobalGroups, joinIntoGroup} from '../store/index'
import {GroupCard} from './index'
import {Segment, Button} from 'semantic-ui-react'

class JoinGroups extends Component {
  async componentDidMount() {
    await this.props.fetchGlobalGroups()
  }
  render() {
    let groups = this.props.groups
    console.log(this.props)
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
                  <Button
                    onClick={() => this.props.joinIntoGroup(this.props.id, id)}
                  >
                    Join group
                  </Button>
                </Segment>
              </Link>
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
