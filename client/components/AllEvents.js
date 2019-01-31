import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllEvents, decideEvent} from '../store/event'
import EventCard from './EventCard'
import {Button} from 'react-bootstrap'

class AllEvents extends Component {
  async componentDidMount() {
    let userId = this.props.userId
    let groupId = this.props.groupId
    await this.props.fetchAllEvents(userId, groupId)
  }

  handleClick() {
    //maybe async, maybe put constructor and bind this inside it
    let groupId = this.props.groupId
    this.props.decideEvent(groupId)
  }

  render() {
    const {events} = this.props
    return (
      <div id="all-events">
        <h3>Let the Hunger Games begin!</h3>
        <div>
          {events.map(activity => {
            return (
              <EventCard
                activity={activity}
                key={activity.id}
                userId={this.props.userId}
              />
            )
          })}
        </div>
        <br />
        <br />
        <Button onClick={this.handleClick}>Decide Event</Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    events: state.event.events,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAllEvents: (userId, groupId) =>
    dispatch(fetchAllEvents(userId, groupId)),
  decideEvent: groupId => dispatch(decideEvent(groupId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllEvents)
