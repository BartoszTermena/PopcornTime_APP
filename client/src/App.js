import React from 'react'
import axios from 'axios';

class SimpleReactFileUpload extends React.Component { 
    state ={
      file:null,
      files: []
    }
    componentDidMount() {
      axios.get('http://localhost:5000/files/')
      .then(res => {
        this.setState({files: res.data})
      })
      .catch(err => {
        console.log(err)
      })
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
    const { files } = this.state;
    console.log(files)
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <h1>File Upload</h1>
          <input type="file" name="file" id="file" onChange={this.onChange} />
          <button type="submit">Upload</button>
        </form>
        {files.map(file => {
          return (
            <div>{file.filename}</div>
          )
        })}
      </div>
   )
  }
}



export default SimpleReactFileUpload