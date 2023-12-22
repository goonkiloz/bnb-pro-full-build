import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { deleteReview} from '../../store/reviews';

function DeleteReviewModal(props) {
    const dispatch = useDispatch()

    const { closeModal } = useModal()

    const { reviewId } = props;

    const handleSubmit = async(e) => {
        e.preventDefault()
        await dispatch(deleteReview(reviewId))
        .then(closeModal())
    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <h1>Confirm Delete</h1>
                <h3>Are you sure you want to remove this review?</h3>
                <button type='submit'>Yes (Delete Review)</button>
                <button type='button' onClick={() => closeModal()}>No (Keep Review)</button>
            </form>
        </div>
     );
}

export default DeleteReviewModal;
