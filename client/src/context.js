import React, { Component } from 'react'
import axios from 'axios'
import Files from './Files'

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state ={
    file:null,
    files: []
  }
  fetchFiles = () => {
    axios.get('http://localhost:5000/files/')
    .then(res => {
      this.setState({files: res.data})
    })
    .catch(err => {
      console.log(err)
    })
  }
  componentDidMount(){
      this.fetchFiles()
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
      <ProductContext.Provider 
      value={{
        ...this.state,
        fetchFiles: this.fetchFiles,
        onChange: this.onChange,
        onFormSubmit: this.onFormSubmit
      }}>
      <Files />
      </ProductContext.Provider>
    )
    
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };