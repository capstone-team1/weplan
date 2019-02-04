import React from 'react'
import {connect} from 'react-redux'
import {Grid, Row, Col, ListGroup, Button, List, Label} from 'semantic-ui-react'
import {removeSingleGroup} from '../store/index'

const GroupCard = props => {
  return (
    <List divided selection>
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
const mapStateToProps = state => {
  return {
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => ({
  removeSingleGroup: (groupId, userId) =>
    dispatch(removeSingleGroup(groupId, userId))
})
export default connect(mapStateToProps, mapDispatchToProps)(GroupCard)
