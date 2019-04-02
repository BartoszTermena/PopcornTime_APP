import React, { Component } from 'react';
import {ProductConsumer} from '../../context'
import './modal.css'

class Modal extends Component {    
  render() {
    return (
      <ProductConsumer>
        {(value) => {
          return (
          <div className="modal-container">          
            <div className="modal">
              
            </div>     
          </div>
          )
        }}
      </ProductConsumer>
    )
  }
}

export default Modal;