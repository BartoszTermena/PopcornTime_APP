import React, { Component } from 'react'
import {ProductProvider} from './context'
import Nav from './components/navbar/Nav'
import "./App.css"

export default class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <ProductProvider />
      </div>
    )
  }
}