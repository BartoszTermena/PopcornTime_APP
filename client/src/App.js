import React from 'react'
import GlobalState from './context/GlobalState'
import Nav from './components/navbar/Nav'
import Files from './components/Files'
import Modal from './components/modal/Modal'
import "./App.css"

const App = props => {
  return (
    <GlobalState>
      <Nav />
      <Files />
      <Modal />
    </GlobalState>
  )
}
export default App