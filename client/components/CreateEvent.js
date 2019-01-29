import React, {Component} from 'react'
import {createEvent} from '../store/index'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'

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
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    let userId = this.props.userId
    this.props.createEvent(userId, this.state)
    this.setState({
      name: '',
      description: '',
      location: ''
    })
  }
  render() {
    return (
      <form onChange={this.handleChange}>
        <input
          id="eventName"
          type="text"
          name="name"
          value={this.state.name}
          placeholder="Enter Event Name"
        />
        <input
          id="eventDescription"
          type="text"
          name="description"
          value={this.state.decription}
          placeholder="Enter description"
        />
        <input
          id="eventLocation"
          type="text"
          name="location"
          value={this.state.location}
          placeholder="Enter location"
        />
        <Button onClick={this.handleSubmit}>Submit</Button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createOneEvent: (userId, newEvent) =>
      dispatch(createEvent(userId, newEvent))
  }
}

export default connect(null, mapDispatchToProps)(CreateEvent)
