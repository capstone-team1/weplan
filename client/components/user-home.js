import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Carousel} from 'react-bootstrap'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <Carousel interval={2000}>
        <Carousel.Item>
          <img
            alt="300x300"
            src="http://2.bp.blogspot.com/-THqzUlWepv8/UeFZbv7l7AI/AAAAAAAAQvA/BJ60SUXVefY/s1600/funny+smileys+hd87.jpg"
          />
          <Carousel.Caption>
            <h1>Have Fun With Groups</h1>
            <p>Create Events With Friends!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            alt="300x300"
            src="http://teenskepchick.org/files/2014/10/remember-to-have-fun.jpg-@-stephaniesaye.com-.jpg"
          />
          <Carousel.Caption>
            <h1>Create Fun Groups W Friends</h1>
            <p>Make Some Fun Events</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            alt="300x300"
            src="https://i.ytimg.com/vi/CAb_bCtKuXg/maxresdefault.jpg"
          />
          <Carousel.Caption>
            <h1>Groups Are Cool</h1>
            <p>Events Are Cooler</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
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
