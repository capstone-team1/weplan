import React from 'react'
import {Button, Label, Icon, List} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {changeEventVote} from '../store'

const EventCard = props => {
  const activity = props.activity

  return (
    <div key={activity.id}>
      <List
        divided
        selection
        style={{
          backgroundColor: '#F5E2DE',
          borderRadius: '15px',
          paddingRight: '15%',
          paddingLeft: '15%',
          marginLeft: '25%',
          marginRight: '25%',
          textAlign: 'center',
          border: '9px solid rgba(255, 255, 255, .5)'
        }}
      >
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
