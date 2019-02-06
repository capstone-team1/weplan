import React from 'react'
import {List, Label} from 'semantic-ui-react'

const GroupCard = props => {
  return (
    <div>
      <List
        divided
        selection
        style={{
          backgroundColor: '#F5E2DE',
          borderRadius: '15px',
          border: '3px solid rgba(255, 255, 255, .5)',
          textAlign: 'center',
          paddingRight: '15%',
          paddingLeft: '15%',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        <List.Item>
          <Label color="grey" horizontal>
            Name
          </Label>
          {props.name}
        </List.Item>
        <List.Item>
          <Label color="grey" horizontal>
            Description
          </Label>
          {props.description}
        </List.Item>
      </List>
    </div>
  )
}

export default GroupCard
