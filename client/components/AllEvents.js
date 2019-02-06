import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllEvents, deleteSingleEvent, decideEvent} from '../store/event'
import EventCard from './EventCard'
import {Button} from 'react-bootstrap'
import MapCard from './MapCard'

class AllEvents extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  async componentDidMount() {
    let userId = this.props.userId
    let groupId = this.props.groupId
    await this.props.fetchAllEvents(userId, groupId)
  }

  handleClick() {
    setTimeout(() => {
      let groupId = this.props.groupId
      this.props.decideEvent(groupId)
    }, 1000)
    //1 second = 1,000 milliseconds.
  }

  render() {
    const {events} = this.props
    return (
      <div id="all-events">
        <h3>Vote on your favorite Event!</h3>
        <div>
          {events.map((activity, i) => {
            if (activity.chosen === true) {
              //Renders when event has been chosen
              return (
                <div key={i}>
                  <EventCard
                    activity={activity}
                    key={activity.id}
                    userId={this.props.userId}
                  />
                  <MapCard locationinfo={activity.location} />
                  <Button
                    onClick={() =>
                      this.props.deleteEvent(this.props.userId, activity.id)
                    }
                  >
                    Delete
                  </Button>
                </div>
              )
            } else {
              //Renders normally (All events at once) BEFORE any event is chosen
              return (
                <div key={i}>
                  <EventCard
                    activity={activity}
                    key={activity.id}
                    userId={this.props.userId}
                  />
                  <Button
                    onClick={() =>
                      this.props.deleteEvent(this.props.userId, activity.id)
                    }
                  >
                    Delete
                  </Button>
                </div>
              )
            }
          })}
        </div>
        <br />
        <br />
        <Button onClick={this.handleClick}>
          Start Decider Countdown- 10 seconds
        </Button>
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
  deleteEvent: (userId, eventId) =>
    dispatch(deleteSingleEvent(userId, eventId)),

  fetchAllEvents: (userId, groupId) =>
    dispatch(fetchAllEvents(userId, groupId)),

  decideEvent: groupId => dispatch(decideEvent(groupId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllEvents)
