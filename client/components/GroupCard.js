import React from 'react'
import {Grid, Row, Col, ListGroup} from 'react-bootstrap'

const GroupCard = props => {
  let {name, description} = props
  return (
    <Grid fluid>
      <Row>
        <ListGroup as="ul">
          <Col md={2} xs={2}>
            <h3>Name:</h3>
            <h2>{name}</h2>
          </Col>

          <Col md={2} xs={2}>
            <h3>Description:</h3>
            <h2>{description}</h2>
          </Col>
        </ListGroup>
      </Row>
    </Grid>
  )
}

export default GroupCard
