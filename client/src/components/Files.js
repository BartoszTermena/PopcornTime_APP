import React from 'react'
import FilesContext from '../context/files-context';

const Files = props => { 
  return (
    <FilesContext.Consumer>
    {(value) => {
      
      return (
        <div>
          <form onSubmit={(e) => value.uploadFile(e)}>
            <h1>File Upload</h1>
            <input type="file" name="file" id="file" onChange={(e) => value.settingFile(e)} />
            <button type="submit">Upload</button>
          </form>
            {value.files.map(file => {
              return (
                <div>
                  <a onClick={() => {value.getFile(file.filename)}}>{file.filename}</a>
                </div>
              )
            })}
        </div>
      )
    }}
    </FilesContext.Consumer>
  )
}


export default Files