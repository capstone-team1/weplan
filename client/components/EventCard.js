import React from 'react'
import {Button, Label, Icon, List} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {changeEventVote} from '../store'

const EventCard = props => {
  const activity = props.activity

  return (
    <div key={activity.id}>
      <List divided selection id="event-card">
        <List.Item>
          <Label color="grey" horizontal>
            Name
          </Label>
          {activity.name}
        </List.Item>
        <List.Item>
          <Label color="grey" horizontal>
            Description
          </Label>
          {activity.description}
        </List.Item>
        <List.Item>
          <Label color="grey" horizontal>
            Location
          </Label>
          {activity.location}
        </List.Item>
        <List.Item>
          <Button as="div" labelPosition="right">
            <Button
              color="#FEDCAC"
              onClick={() => props.changeVote(activity.id)}
            >
              <Icon name="heart" />
              Vote
            </Button>
            <Label as="a" basic color="#FEDCAC" pointing="left">
              {activity.votes}
            </Label>
          </Button>
        </List.Item>
      </List>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  changeVote: eventId => dispatch(changeEventVote(eventId))
})

export default connect(null, mapDispatchToProps)(EventCard)
