import React from 'react';
import FilesContext from '../../context/files-context'
import './modal.css'

const Modal = (props) => {    
  return (
    <FilesContext.Consumer>
      {(value) => {
            return ( 
              <>
              {value.toggle && (
                <div className="modal">
                  <img src={`http://localhost:5000/files/${value.file}`} /> 
                
                  <button onClick={() => value.hideModal()}>HIDE MODAL</button>
                </div>     
                )
              }
            </>
            )
      }}
    </FilesContext.Consumer>
  )
}


export default Modal;