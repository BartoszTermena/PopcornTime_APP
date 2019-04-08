import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FileContext from './files-context'

const GlobalState = props => {
  const [files, setFiles] = useState({files: []})
  const [uploadedFile, setUploadedFile] = useState(null)
  const [file, setFile] = useState(null)
  const [toggle, setToggle] = useState(false)
  const [refresh, setRefresh] = useState('fetchAgain');

  const fetchFiles = () => {
    console.log("Fetching")
    axios.get('/files')
    .then(res => {
      setFiles({files: res.data})
    })
    .catch(err => {
      console.log(err)
    })
  }
  useEffect(() => {
    fetchFiles()
  }, [refresh])

  const showModal = () => {
    setToggle(true)
  }
  const hideModal = () => {
    setToggle(false)
  }
  const settingFile = (e) => {
    setUploadedFile(e.target.files[0])
  }
  const getFile = (file) => {
    setFile(file)
    showModal()
  }
  const uploadFile = (e) => {
    e.preventDefault();
    const file = uploadedFile
    const formData = new FormData();
    formData.append('file', file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    axios.post('/upload', formData, config)
    .then(res => {
      console.log(res);
      setRefresh(res)
    })
    .catch(error => {
      console.log(error);
    });
  }
  return (
    <FileContext.Provider 
      value={{
        ...files,
        uploadedFile,
        file,
        toggle,
        fetchFiles: fetchFiles,
        settingFile: settingFile,
        uploadFile: uploadFile,
        hideModal: hideModal,
        getFile: getFile
      }}>
      {props.children}
    </FileContext.Provider>
  )
}



export default GlobalState