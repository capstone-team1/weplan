import React, {Component} from 'react'
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
    return (
      <div>
        {groups.map(({id, name, description}) => {
          return (
            <div key={name} style={{padding: '20px', textAlign: 'center'}}>
              <GroupCard name={name} description={description} groupId={id} />
              <Button
                onClick={() => this.props.joinIntoGroup(this.props.id, id)}
                style={{
                  margin: '11px',
                  backgroundColor: '#779CAB',
                  border: '3px solid rgba(255, 255, 255, .5)'
                }}
              >
                Join group
              </Button>
            </div>
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
