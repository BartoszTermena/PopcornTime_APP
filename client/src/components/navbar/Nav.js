import React, { Component } from 'react'
import logo from '../../img/popcorn-time-logo.png'
import './nav.css'

export default class Nav extends Component {
  render() {
    return (
      <div>
        <nav>
        <img className="app-logo" src={logo} />
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </nav>
      </div>
    )
  }
}
