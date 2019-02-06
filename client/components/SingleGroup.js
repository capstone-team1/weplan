import React, {Component} from 'react'
import {connect} from 'react-redux'
import {AllEvents, CreateEvent} from './index'
import {fetchSingleGroup} from '../store/index'
import {Button} from 'semantic-ui-react'
import {CopyToClipboard} from 'react-copy-to-clipboard'

class SingleGroup extends Component {
  constructor() {
    super()
    this.state = {link: '', copied: false}
    this.generateLink = this.generateLink.bind(this)
  }
  componentDidMount() {
    this.props.fetchSingleGroup(
      this.props.userId,
      this.props.match.params.groupId
    )
  }
  generateLink() {
    this.setState({
      link: `http://localhost:8080/api/users/join/${
        this.props.singleGroup.linkId
      }`
    })
  }
  render() {
    console.log(this.props.singleGroup)
    return (
      <div>
        <div>
          <AllEvents groupId={this.props.match.params.groupId} />
        </div>
        <div>
          <CreateEvent
            userId={this.props.userId}
            groupId={this.props.match.params.groupId}
          />
        </div>
        <div className="link-invite-generator">
          <Button basic color="teal" onClick={this.generateLink}>
            Invite Link
          </Button>
          <CopyToClipboard
            text={this.state.link}
            onCopy={() => this.setState({copied: true})}
          >
            <input className="link" value={this.state.link} />
          </CopyToClipboard>
          {this.state.copied ? alert('invite link has been copied') : null}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.id,
  singleGroup: state.groupReducer.group
})

const mapDispatchToProps = dispatch => ({
  fetchSingleGroup: (userId, groupId) =>
    dispatch(fetchSingleGroup(userId, groupId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleGroup)
