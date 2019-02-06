import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Header, Grid, Container, Image} from 'semantic-ui-react'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <Header as="h2" icon textAlign="center">
        <Header.Content>Welcome, To WePlan {email}</Header.Content>
      </Header>
      <Container fluid>
        <Header as="h2">Create Groups and Events </Header>
        <p>Click on join group to see all available groups</p>
        <p>
          My groups has all of your current groups. Once inside feel free to
          create new groups and events
        </p>
        <p>
          Once an event is decided, an email reminder will be sent to your inbox
        </p>
        <Image
          src="https://i2.wp.com/sydneyrockies.org.au/wp-content/uploads/2018/12/SRC-Committee2018-19.jpg?resize=768%2C576"
          size="large"
        />
      </Container>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
