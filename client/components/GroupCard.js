import React from 'react'
import {List, Label} from 'semantic-ui-react'

const GroupCard = props => {
  return (
    <List divided selection>
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
  )
}

export default GroupCard
