import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FileContext from './files-context'

const GlobalState = props => {
  const [files, setFiles] = useState({files: []})
  const [uploadedImage, setUploadedImage] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [file, setFile] = useState(null)
  const [toggle, setToggle] = useState(false)
  const [refresh, setRefresh] = useState('fetchAgain');
  const [isLoading, setIsLoading] = useState(false)

  const fetchFiles = () => {
    console.log("Fetching")
    axios.get('http://localhost:5000/files')
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
  const settingImage = (e) => {
    setUploadedImage(e.target.files[0])
  }
  const getFile = (file) => {
    setFile(file)
    showModal()
  }
  const uploadFile = (e) => {
    setIsLoading(true)
    e.preventDefault();
    const file = uploadedFile
    const img = uploadedImage
    const formData = new FormData();
    formData.append('userFile', file)
    formData.append('userFile', img)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    axios.post('http://localhost:5000/upload', formData, config)
    .then(res => {
      console.log(res);
      setRefresh(res)
      setIsLoading(false)
    })
    .catch(error => {
      console.log(error);
      setIsLoading(false)
    });
  }
  return (
    <FileContext.Provider 
      value={{
        ...files,
        uploadedFile,
        file,
        isLoading,
        toggle,
        fetchFiles: fetchFiles,
        settingFile: settingFile,
        settingImage: settingImage,
        uploadFile: uploadFile,
        hideModal: hideModal,
        getFile: getFile
      }}>
      {props.children}
    </FileContext.Provider>
  )
}



export default GlobalState