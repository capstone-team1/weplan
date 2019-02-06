import React from 'react'

const MapCard = props => {
  let location = props.locationinfo
  //.split(' ').join() Uncomment and add to the end of above line if regular strings arent accuracte enough for the link below

  return (
    <img
      src={`https://maps.googleapis.com/maps/api/staticmap?center=${location}
        &zoom=18&size=600x300&maptype=roadmap
        &markers=color:red%7Clabel:C%7C${location}
        &key=`}
    />
  )
}

export default MapCard
