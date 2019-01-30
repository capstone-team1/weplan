import React from 'react'
import {Button} from 'react-bootstrap'
import changeEventVote from '../store'

const EventCard = props => {
  const {event} = props
  return (
    <div id="eventCard" key={event.id}>
      <p id="name">{event.name}</p>
      <p id="description">{event.description}</p>
      <p id="location">{event.location}</p>
      <p id="upvotes">{event.upvotes}</p>
      <Button onClick={() => changeEventVote(props.userId, event.id, 1)}>
        Upvote
      </Button>
      <Button
        bsStyle="warning"
        onClick={() => changeEventVote(props.userId, event.id, -1)}
      >
        Downvote
      </Button>
    </div>
  )
}

export default EventCard
