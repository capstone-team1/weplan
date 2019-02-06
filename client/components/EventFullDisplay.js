import React, {Component} from 'react'
import {createGroup} from '../store/index'
import {connect} from 'react-redux'
import {Button, Form, Segment} from 'semantic-ui-react'
const axios = require('axios')
axios.defaults.headers.common.app_key = 'zVLRNn4d3LMWjKJK'

class EventFullDisplay extends Component {
  constructor() {
    super()

    this.state = {
      eventFull: ''
    }
  }

  async componentDidMount() {
    let {data} = await axios.get(
      'http://api.eventful.com/rest/events/search?keywords=ny&app_key=zVLRNn4d3LMWjKJK&total_items=3&location="nyc"'
    )
    console.log(data)
  }

  render() {
    return <div />
  }
}

export default EventFullDisplay
