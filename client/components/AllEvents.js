import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllEvents, deleteSingleEvent, decideEvent} from '../store/event'
import EventCard from './EventCard'
import {Button} from 'react-bootstrap'

class AllEvents extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  async componentDidMount() {
    let userId = this.props.userId
    let groupId = this.props.groupId
    await this.props.fetchAllEvents(userId, groupId)
    console.log(this.props)
  }

  handleClick() {
    setTimeout(() => {
      let groupId = this.props.groupId
      this.props.decideEvent(groupId)
    }, 10000) //ten seconds = 10,000 milliseconds.
    //we will make this choosable later but
    //for development we will keep it short
  }

  render() {
    const {events} = this.props
    return (
      <div id="all-events">
        <h3>Let the Hunger Games begin!</h3>
        <div>
          {events.map((activity, i) => {
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
