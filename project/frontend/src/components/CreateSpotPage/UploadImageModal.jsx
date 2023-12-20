import { useState } from 'react';
import { useModal } from '../../context/Modal';

function UploadImageModal(props) {
  const { onRegister } = props
  const [files, setFiles] = useState([]);
  const { closeModal } = useModal()

  function handleMultipleChange(event) {
    setFiles([...event.target.files]);
  }

  const reg = () => {
    onRegister(files);

    closeModal()
  }

  return (
    <div className="App">
      <form >
        <h1>Upload Spots Here!</h1>
        <input type="file" multiple onChange={handleMultipleChange} />
        <button type= 'button' onClick={reg}>Upload</button>
      </form>
    </div>
  );
}

export default UploadImageModal;
