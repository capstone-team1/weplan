import React from 'react'
import {connect} from 'react-redux'
import {Button, List, Label} from 'semantic-ui-react'
import {removeSingleGroup} from '../store/index'
import {Link} from 'react-router-dom'

const GroupCard = props => {
  return (
    <List divided selection>
      <Link to={`/group/${props.groupId}`}>
        <List.Item>
          <Label color="grey" horizontal>
            Name
          </Label>
          {props.name}
        </List.Item>
        <List.Item>
          <Label color="grey" horizontal>
            Description
          </Label>
          {props.description}
        </List.Item>
      </Link>
      <List.Item>
        <Button
          onClick={() => props.removeSingleGroup(props.groupId, props.userId)}
        >
          Delete Group
        </Button>
      </List.Item>
    </List>
  )
}

const mapDispatchToProps = dispatch => ({
  removeSingleGroup: (groupId, userId) =>
    dispatch(removeSingleGroup(groupId, userId))
})
export default connect(null, mapDispatchToProps)(GroupCard)
