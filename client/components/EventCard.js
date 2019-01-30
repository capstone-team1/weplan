import React from 'react'

const EventCard = props => {
  const {event} = props
  return (
    <div id="eventCard" key={event.id}>
      <p id="name">Event: {event.name}</p>
      <p id="description">Description: {event.description}</p>
      <p id="location">Location: {event.location}</p>
      <p id="upvotes">Votes: {event.upvotes}</p>
    </div>
  )
}

export default EventCard
