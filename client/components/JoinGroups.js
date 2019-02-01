import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchGlobalGroups} from '../store/index'
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
              <Link to={`/group/${id}`} key={name}>
                <GroupCard name={name} description={description} groupId={id} />
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
  fetchGlobalGroups: () => dispatch(fetchGlobalGroups())
})

export default connect(mapStateToProps, mapDispatchToProps)(JoinGroups)
