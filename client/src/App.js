import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalState from './context/GlobalState'
import Nav from './components/navbar/Nav'
import Files from './components/Files'
import Modal from './components/modal/Modal'
import UploadFiles from './components/UploadFile'
import "./App.css"

const App = props => {
  return (
    <GlobalState>
      <BrowserRouter>
        <Nav />
        <div className="container">
          <Modal />
          <Switch>
            <Route path="/" component={Files} exact />
            <Route path="/upload" component={UploadFiles} exact />
          </Switch>
        </div>
      </BrowserRouter>
    </GlobalState>
  )
}
export default App