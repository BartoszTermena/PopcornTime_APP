import React, { Component } from 'react';
import FilesContext from '../../context/files-context'
import './modal.css'

class Modal extends Component {    
  render() {
    return (
      <FilesContext.Consumer>
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
      </FilesContext.Consumer>
    )
  }
}

export default Modal;