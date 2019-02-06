import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllEvents, deleteSingleEvent, decideEvent} from '../store/event'
import EventCard from './EventCard'
import MapCard from './MapCard'
import {Button, Header} from 'semantic-ui-react'

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
      <div>
        <div>
          <Header
            as="h1"
            style={{
              textAlign: 'center',
              marginLeft: '35%',
              marginRight: '35%',
              borderRadius: '15px',
              color: '#35524A',
              backgroundColor: '#A2E8DD'
            }}
          >
            Vote
          </Header>
          <div>
            {events.map((activity, i) => {
              if (activity.chosen === true) {
                //Renders when event has been chosen
                return (
                  <div key={i} style={{padding: '20px', textAlign: 'center'}}>
                    <EventCard
                      activity={activity}
                      key={activity.id}
                      userId={this.props.userId}
                    />
                    <MapCard locationinfo={activity.location} />
                    <Button
                      id="delete-event"
                      onClick={() =>
                        this.props.deleteEvent(this.props.userId, activity.id)
                      }
                    >
                      Delete
                    </Button>
                  </div>
                )
              } else {
                return (
                  <div key={i} style={{padding: '20px', textAlign: 'center'}}>
                    <EventCard
                      activity={activity}
                      key={activity.id}
                      userId={this.props.userId}
                    />
                    <Button
                      onClick={() =>
                        this.props.deleteEvent(this.props.userId, activity.id)
                      }
                      style={{
                        backgroundColor: '#A2E8DD',
                        border: '3px solid rgba(255, 255, 255, .5)',
                        margin: '11px'
                      }}
                    >
                      Delete Event
                    </Button>
                  </div>
                )
              }
            })}
          </div>
        </div>
        <div
          style={{
            textAlign: 'center',
            margin: 'auto'
          }}
        >
          <Button
            onClick={this.handleClick}
            style={{
              backgroundColor: '#779CAB',
              border: '3px solid rgba(255, 255, 255, .5)',
              margin: '11px'
            }}
          >
            Start Decider Countdown- 10 seconds
          </Button>
        </div>
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
