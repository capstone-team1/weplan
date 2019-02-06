import React, {Component} from 'react'
import {createGroup} from '../store/index'
import {connect} from 'react-redux'
import {Button, Form, Segment} from 'semantic-ui-react'

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
      <div>
        <Segment style={{backgroundColor: '#A2E8DD'}}>
          <Form onChange={this.handleChange}>
            <Form.Group widths="equal">
              <label>Create New Group</label>
              <Form.Field>
                <input
                  placeholder="Group Name"
                  name="name"
                  value={this.state.name}
                />
              </Form.Field>
              <Form.Field>
                <input
                  placeholder="Description"
                  name="description"
                  value={this.state.description}
                />
              </Form.Field>
            </Form.Group>
            <Form.Field style={{textAlign: 'center'}}>
              <Button
                color="blue"
                type="submit"
                onClick={this.handleSubmit}
                style={{
                  backgroundColor: '#779CAB',
                  color: '#333333',
                  textAlign: 'center',
                  border: '3px solid rgba(255, 255, 255, .5)'
                }}
              >
                Submit
              </Button>
            </Form.Field>
          </Form>
        </Segment>
      </div>
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
