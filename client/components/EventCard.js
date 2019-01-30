import React from 'react'
import {Button} from 'react-bootstrap'

const EventCard = props => {
  const {event} = props
  return (
    <div id="eventCard" key={event.id}>
      <p id="name">{event.name}</p>
      <p id="description">{event.description}</p>
      <p id="location">{event.location}</p>
      <p id="upvotes">{event.upvotes}</p>
      <Button>upvote</Button>
      <Button bsStyle="warning">downvote</Button>
    </div>
  )
}

export default EventCard
