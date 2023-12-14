import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createSpotImage } from '../../store/spots';

function UploadImageModal(props) {
  const { onRegister } = props
  const [files, setFiles] = useState([]);
  const { closeModal } = useModal()

  function handleMultipleChange(event) {
    console.log(event.target.files)
    setFiles([...event.target.files]);
  }

  function handleMultipleSubmit(event) {
    event.preventDefault();
    console.log(files)

    closeModal()


  }

  const reg = () => {
    onRegister(files);
  }

  return (
    <div className="App">
      <form onSubmit={handleMultipleSubmit}>
        <h1>React Multiple File Upload</h1>
        <input type="file" multiple onChange={handleMultipleChange} />
        <button type="submit" onClick={reg}>Upload</button>
      </form>
    </div>
  );
}

export default UploadImageModal;
