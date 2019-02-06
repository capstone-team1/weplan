import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Menu, Button, Icon} from 'semantic-ui-react'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1
      style={{
        textAlign: 'center',
        border: '3px solid rgba(255, 255, 255, .5)',
        color: '#35524A',
        backgroundColor: '#A2E8DD',
        borderBottomRightRadius: '15px',
        borderBottomLeftRadius: '15px',
        marginLeft: '30%',
        marginRight: '30%'
      }}
    >
      WePlan
    </h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}

          <Menu
            widths={4}
            style={{
              backgroundColor: '#779CAB',
              borderRadius: '25px',
              border: '3px solid rgba(255, 255, 255, .5)'
            }}
          >
            <Menu.Item>
              <NavLink to="/home">
                <Button
                  style={{
                    border: '3px solid rgba(255, 255, 255, .5)',
                    backgroundColor: '#A2E8DD'
                  }}
                >
                  <Icon name="home" />
                </Button>
              </NavLink>
            </Menu.Item>

            <Menu.Item>
              <Link to="/join">
                <Button
                  style={{
                    border: '3px solid rgba(255, 255, 255, .5)',
                    backgroundColor: '#A2E8DD'
                  }}
                >
                  <Icon name="plus square" />Join Group
                </Button>
              </Link>
            </Menu.Item>

            <Menu.Item>
              <Link to="/groups">
                <Button
                  style={{
                    border: '3px solid rgba(255, 255, 255, .5)',
                    backgroundColor: '#A2E8DD'
                  }}
                >
                  <Icon name="group" />My Groups
                </Button>
              </Link>
            </Menu.Item>

            <Menu.Item>
              <Button
                onClick={handleClick}
                style={{
                  border: '3px solid rgba(255, 255, 255, .5)',
                  backgroundColor: '#A2E8DD'
                }}
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
