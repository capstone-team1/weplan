import React from 'react'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {changeEventVote} from '../store'

const EventCard = props => {
  const activity = props.activity

  return (
    // CSS/HTML Class names and ids must all be kebab-case...event-card
    <div id="eventCard" key={activity.id}>
      <p id="name">{activity.name}</p>
      <p id="description">{activity.description}</p>
      <p id="location">{activity.location}</p>
      <p id="upvotes">Votes: {activity.votes}</p>
      <Button onClick={() => props.changeVote(props.userId, activity.id, 1)}>
        Upvote
      </Button>
      <Button
        bsStyle="warning"
        onClick={() => props.changeVote(props.userId, activity.id, -1)}
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
  changeVote: (userId, eventId, vote) =>
    dispatch(changeEventVote(userId, eventId, vote))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventCard)
