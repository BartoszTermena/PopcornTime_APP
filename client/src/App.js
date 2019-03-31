import React from 'react'
import axios from 'axios';

class SimpleReactFileUpload extends React.Component { 
    state ={
      file:null
    }
  onChange = (e) => {
    this.setState({file:e.target.files[0]})
  }
  onFormSubmit = (e) => {
    e.preventDefault();
    const file = this.state.file
    const formData = new FormData();
    formData.append('file', file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    axios.post('http://localhost:5000/upload', formData, config)
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" name="file" id="file" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
   )
  }
}



export default SimpleReactFileUpload