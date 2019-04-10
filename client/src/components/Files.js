import React from 'react'
import FilesContext from '../context/files-context';
import Spinner from '../components/spinner/Spinner'

const Files = props => { 
  return (
    <FilesContext.Consumer>
    {(value) => {
      return (
        <div className="files-container">
            {value.files.length > 0 ? value.files.map(file => {
              return (
                <div>
                  <a onClick={() => {value.getFile(file.filename)}}>{file.filename}</a>
                </div>
              )
            })
            : <Spinner />
          }
           
        </div>
      )
    }}
    </FilesContext.Consumer>
  )
}


export default Files