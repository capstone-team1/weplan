import React, {Component} from 'react'
import {createGroup} from '../store/index'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'

class CreateGroup extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: ''
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
    this.props.createGroup(userId, this.state)
    this.setState({
      name: '',
      description: ''
    })
  }
  render() {
    return (
      <form onChange={this.handleChange}>
        <input
          id="groupName"
          type="text"
          name="name"
          value={this.state.name}
          placeholder="Enter Group Name"
        />
        <input
          id="groupDescription"
          type="text"
          name="description"
          value={this.state.decription}
          placeholder="Enter description"
        />
        <Button onClick={this.handleSubmit}>Submit</Button>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createGroup: (userId, newGroup) => dispatch(createGroup(userId, newGroup))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup)
