import React from 'react';
import FilesContext from '../../context/files-context'
import './modal.css'

const Modal = (props) => {    
  return (
    <FilesContext.Consumer>
      {(value) => {
        console.log(`http://localhost:5000/files/${value.file}`)
          return ( 
            <>
            {value.toggle && 
            (
              <div className="modal-container">
                <video width="1280" height="720" autoPlay>
                  <source src={`http://localhost:5000/files/${value.file}`} type="video/mp4" />
                </video>
                <button 
                className="button-primary"
                onClick={() => value.hideModal()}>HIDE MODAL</button>
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