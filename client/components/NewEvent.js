import React, {Component} from 'react'
import EventForm from './EventForm'
import {createOneEvent} from '../store/index'
import {connect} from 'react-redux'

class NewEvent extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      location: '',
      firstchoice: '',
      secondchoice: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event, values) {
    event.preventDefault()
    this.setState({
      values
    })
    console.log(values)
    const {name, description, location, firstchoice, secondchoice} = this.state
    const newEvent = {
      name,
      description,
      location
    }
    this.props.createOneEvent(newEvent)
  }
  render() {
    return (
      <EventForm
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    newUser: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createOneEvent: newEvent => dispatch(createOneEvent(newEvent))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEvent)
