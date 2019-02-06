import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div style={{backgroundColor: '#333333'}}>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
