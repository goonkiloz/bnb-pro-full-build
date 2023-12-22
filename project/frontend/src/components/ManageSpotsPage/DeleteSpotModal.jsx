import { useModal } from '../../context/Modal';
import { deleteSpot } from '../../store/spots';
import { useDispatch } from 'react-redux';
import './DeleteSpot.css'

function DeleteSpotModal(props) {
    const dispatch = useDispatch()

    const { closeModal } = useModal()

    const { spotId } = props;

    console.log(spotId)

    const handleSubmit = async(e) => {
        e.preventDefault()

        console.log('submitted')
        await dispatch(deleteSpot(spotId))
        .then(closeModal())
    }

    return (
        <div className="deleteDiv">
            <form onSubmit={handleSubmit}>
                <h1>Confirm Delete</h1>
                <h3>Are you sure you want to remove this spot from the listings?</h3>
                <button className='deleteButton' type='submit'>Yes (Delete Spot)</button>
                <button className='noButton' type='button' onClick={() => closeModal()}>No (Keep Spot)</button>
            </form>
        </div>
     );
}

export default DeleteSpotModal;
