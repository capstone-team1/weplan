import React from 'react'

const EventCard = props => {
  const {event} = props
  return (
    <div id="eventCard" key={event.id}>
      <p id="name">{event.name}</p>
      <p id="description">{event.description}</p>
      <p id="location">{event.location}</p>
      <p id="upvotes">{event.upvotes}</p>
    </div>
  )
}

export default EventCard
