import React, {Component} from 'react'
import Axios from 'axios'
export default class UserHome extends Component {
  constructor() {
    super()
    this.state = {
      weather: 'weather'
    }
    // this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleLocationChange = this.handleLocationChange.bind(this)
  }
  async componentDidMount() {
    try {
      let data = await Axios.get(
        'http://api.openweathermap.org/data/2.5/weather?q=boston&APPID=92a8da4b7e887ff28d9945c617bd10e8'
      )
      this.setState({weather: data.data.weather[0].description})
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    return <h1>{this.state.weather}</h1>
  }
}

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     email: state.user.email
//   }
// }

// export default connect(mapState)(UserHome)

// /**
//  * PROP TYPES
//  */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
