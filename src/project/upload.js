import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

export default function Upload() {
  const onDrop = useCallback(acceptedFiles => {


    console.log("accepted files",acceptedFiles)
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <input type='submit' value="Select Files" />
      }
    </div>
  )
}