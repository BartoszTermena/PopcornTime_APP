import React from 'react'
import { ProductConsumer } from '../context';

class Files extends React.Component { 
  render() {
    return (
      <ProductConsumer>
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
                    <a onClick={() => {value.getFile(file.filename)}}>{file.filename}</a>
                  </div>
                )
              })}
          </div>
        )
      }}
      </ProductConsumer>
   )
  }
}

export default Files