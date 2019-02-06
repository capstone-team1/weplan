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
          borderRadius: '70px',
          textAlign: 'center'
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
