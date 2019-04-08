import React from 'react';

export default React.createContext({
  files: [],
  uploadedFile: null,
  file:null,
  fetchFiles: () => {},
  onChange: (e) => {},
  onFormSubmit: (e) => {},
  getFile: (e) => {}
});