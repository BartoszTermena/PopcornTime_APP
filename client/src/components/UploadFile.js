import React from 'react'
import FilesContext from '../context/files-context';
import Spinner from '../components/spinner/Spinner'

const UploadFile = () => {
    return (
        <FilesContext.Consumer>
            {(value) => {
            return (
                <div className="files-container">
                    <form onSubmit={(e) => value.uploadFile(e)}>
                        <h1>File Upload</h1>
                        Chose File: <input type="file" name="userFile" id="userFile" onChange={(e) => value.settingFile(e)} />
                        Chose Img: <input type="file" name="userFile" id="userFile" onChange={(e) => value.settingImage(e)} />
                        <button type="submit">Upload</button>
                    </form>
                    {value.isLoading ? <Spinner /> : null}
                </div>
                )
            }}
        </FilesContext.Consumer>
        )
    }
export default UploadFile