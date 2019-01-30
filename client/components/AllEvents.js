import React, {Component} from 'react'
import {connect} from 'react-redux'
import fetchAllEvents from '../store/event'
import EventCard from './EventCard'

class AllEvents extends Component {
  async componentDidMount() {
    let userId = this.props.userId
    let groupId = this.props.groupId
    await this.props.fetchAllEvents(userId, groupId)
  }
  render() {
    const {events} = this.props
    return (
      <div id="all-events">
        <h3>Let the Hunger Games begin!</h3>
        <div>
          {events.map(event => {
            return <EventCard event={event} key={event.id} />
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    events: state.event.events,
    userId: state.user.id,
    groupId: state.groupReducer.group.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllEvents: (userId, groupId) =>
      dispatch(fetchAllEvents(userId, groupId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllEvents)
