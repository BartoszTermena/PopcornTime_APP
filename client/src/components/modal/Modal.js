import React, { Component } from 'react';
import {ProductConsumer} from '../../context'
import './modal.css'

class Modal extends Component {    
  render() {
    return (
      <ProductConsumer>
        {(value) => {
            if(value.file) {
              return ( <div className="modal-container">          
            <div className="modal">
              <img src={`/files/${value.file}`} /> 
            </div>     
            </div> )
            } else {
              return (<div>Modal..</div>)
            }
          } 
        }
      </ProductConsumer>
    )
  }
}

export default Modal;