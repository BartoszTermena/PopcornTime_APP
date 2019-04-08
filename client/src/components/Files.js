import React from 'react'
import FilesContext from '../context/files-context';
import Modal from './modal/Modal'


class Files extends React.Component { 
  render() {
    return (
      <FilesContext.Consumer>
      {(value) => {
        console.log(value.files)
        return (
          <div>

            <form onSubmit={(e) => value.onFormSubmit(e)}>
              <h1>File Upload</h1>
              <input type="file" name="file" id="file" onChange={(e) => value.onChange(e)} />
              <button type="submit">Upload</button>
            </form>
              {value.files.map(file => {
                return (
                  <div>
                    <a onClick={() => {value.getFile(file)}}>{file.filename}</a>
                  </div>
                )
              })}
            <Modal />
            
          </div>
        )
      }}
      </FilesContext.Consumer>
   )
  }
}

export default Files