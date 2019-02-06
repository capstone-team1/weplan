import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Menu, Button, Icon} from 'semantic-ui-react'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>WePlan</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}

          <Menu
            widths={4}
            style={{backgroundColor: '#f6a794', borderRadius: '25px'}}
          >
            <Menu.Item>
              <NavLink to="/home">
                <Button style={{backgroundColor: '#FFCBA4'}}>
                  <Icon name="home" />
                </Button>
              </NavLink>
            </Menu.Item>

            <Menu.Item>
              <Link to="/join">
                <Button style={{backgroundColor: '#FFCBA4'}}>
                  <Icon name="plus square" />Join Group
                </Button>
              </Link>
            </Menu.Item>

            <Menu.Item>
              <Link to="/groups">
                <Button style={{backgroundColor: '#FFCBA4'}}>
                  <Icon name="group" />My Groups
                </Button>
              </Link>
            </Menu.Item>

            <Menu.Item>
              <Button
                onClick={handleClick}
                style={{backgroundColor: '#FFCBA4'}}
              >
                <Icon name="log out" />Logout
              </Button>
            </Menu.Item>
          </Menu>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">
            <Button>Login</Button>
          </Link>
          <Link to="/signup">
            <Button>Sign Up </Button>
          </Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
