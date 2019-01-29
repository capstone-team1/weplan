import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap'

const GroupCard = props => {
  return (
    <>
      <Grid fluid>
        <Row>
          <Col md={2} xs={2}>
            <h3>Name: {props.name}</h3>
          </Col>
          <Col md={2} xs={2}>
            <h3>Description: {props.description}</h3>
          </Col>
        </Row>
      </Grid>
    </>
  )
}

export default GroupCard
