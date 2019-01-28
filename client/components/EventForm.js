import React, {Component} from 'react'
import {Container, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap'

const EventForm = props => {
  const {handleSubmit, handleChange} = props
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup row>
          <Label for="name" sm={2}>
            Name
          </Label>
          <Col sm={10}>
            <Input
              type="name"
              name="name"
              id="exampleName"
              placeholder="Event name"
              value={props.firstName}
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="description" sm={2}>
            Description
          </Label>
          <Col sm={10}>
            <Input
              type="description"
              name="description"
              id="exampledescription"
              placeholder="Description"
              value={props.description}
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="location" sm={2}>
            Location
          </Label>
          <Col sm={10}>
            <Input
              type="location"
              name="location"
              id="examplelocation"
              placeholder="Location"
              value={props.location}
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="firstchoice" sm={2}>
            First Choice
          </Label>
          <Col sm={10}>
            <Input
              type="firstchoice"
              name="firstchoice"
              id="examplefirstchoice"
              placeholder="First Choice"
              value={props.firstchoice}
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="secondchoice" sm={2}>
            Second Choice
          </Label>
          <Col sm={10}>
            <Input
              type="secondchoice"
              name="secondchoice"
              id="examplesecondchoice"
              placeholder="Second Choice"
              value={props.secondchoice}
              onChange={handleChange}
            />
          </Col>
        </FormGroup>{' '}
        <FormGroup check row>
          <Col sm={{size: 10, offset: 2}}>
            <Button>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    </Container>
  )
}

export default EventForm
