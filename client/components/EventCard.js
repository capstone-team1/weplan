import React from 'react'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {changeEventVote} from '../store'

const EventCard = props => {
  const {event} = props

  return (
    <div id="eventCard" key={event.id}>
      <p id="name">{event.name}</p>
      <p id="description">{event.description}</p>
      <p id="location">{event.location}</p>
      <p id="upvotes">{event.upvotes}</p>
      <Button
        onClick={() => props.changeEventVote(props.userId, event.groupId, 1)}
      >
        Upvote
      </Button>
      <Button
        bsStyle="warning"
        onClick={() => props.changeEventVote(props.userId, event.groupId, -1)}
      >
        Downvote
      </Button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => ({
  changeEventVote: (userId, eventId, vote) =>
    dispatch(changeEventVote(userId, eventId, vote))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventCard)
