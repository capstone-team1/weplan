import React, {Component} from 'react'
import {connect} from 'react-redux'
import fetchAllEvents from '../store/event'
import EventCard from './EventCard'

class AllEvents extends Component {
  async componentDidMount() {
    let groupId = this.props.groupId
    await this.props.getAllEvents(groupId)
  }
  render() {
    console.log(this.props)
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
    events: state.events
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllEvents: groupId => dispatch(fetchAllEvents(groupId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllEvents)
