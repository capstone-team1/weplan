import React, {Component} from 'react'
import {createEvent} from '../store/index'
import {connect} from 'react-redux'
import {Button, Form, Segment} from 'semantic-ui-react'
import PlacesBar from './PlacesBar'

class CreateEvent extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      location: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    let userId = this.props.userId
    let groupId = this.props.groupId
    this.props.createEvent(userId, groupId, this.state)
    this.setState({
      name: '',
      description: '',
      location: ''
    })
  }

  handleLocationChange(str) {
    this.setState({location: str})
  }

  render() {
    return (
      <div>
        <Segment style={{backgroundColor: '#f6a794'}}>
          <Form
            onChange={this.handleChange}
            style={{textAlign: 'center', margin: 'auto'}}
          >
            <label>Create New Event</label>
            <Form.Field style={{margin: '25px'}}>
              <input
                placeholder="Event Name"
                name="name"
                value={this.state.name}
              />
            </Form.Field>
            <Form.Field style={{margin: '25px'}}>
              <input
                placeholder="Description"
                name="description"
                value={this.state.description}
              />
            </Form.Field>
            <Form.Field>
              <PlacesBar
                location={this.state.location}
                handleSelectChange={this.handleLocationChange}
              />
            </Form.Field>
            <br />
            <Form.Field style={{textAlign: 'center', margin: 'auto'}}>
              <Button color="blue" type="submit" onClick={this.handleSubmit}>
                Submit
              </Button>
            </Form.Field>
          </Form>
        </Segment>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createEvent: (userId, groupId, event) =>
      dispatch(createEvent(userId, groupId, event))
  }
}

export default connect(null, mapDispatchToProps)(CreateEvent)
