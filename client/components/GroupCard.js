import React from 'react'
import {connect} from 'react-redux'
import {Grid, Row, Col, ListGroup, Button} from 'react-bootstrap'
import {removeSingleGroup} from '../store/index'

const GroupCard = props => {
  return (
    <Grid fluid>
      <Row>
        <ListGroup as="ul">
          <Col md={2} xs={2}>
            <h3>Name:</h3>
            <h2>{props.name}</h2>
          </Col>

          <Col md={2} xs={2}>
            <h3>Description:</h3>
            <h2>{props.description}</h2>
          </Col>
          <Button
            onClick={() => props.removeSingleGroup(props.groupId, props.userId)}
          >
            Delete Group
          </Button>
        </ListGroup>
      </Row>
    </Grid>
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
