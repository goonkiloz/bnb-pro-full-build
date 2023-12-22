import { useState, useEffect } from 'react';
import { useModal } from '../../context/Modal';
import { FaStar } from 'react-icons/fa'
import './SpotDetail.css'
import { createReview } from '../../store/reviews';
import { useDispatch, useSelector } from 'react-redux';


function ReviewSpotModal(props) {
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    const [review, setReview] = useState('')
    const [errors, setErrors] = useState('')
    const { closeModal } = useModal()
    const [disable, setDisable] = useState(true)
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.session)
    const { spotId } = props;

    const handleSubmit = async(e) => {
        e.preventDefault()

        const data = {
            review,
            stars: rating
        }

        dispatch(createReview(spotId, data, user))
        .catch(async (res) => {
            const data = await res.json();
            console.log(data)
            if (data && data.message) {
              setErrors(data);
            }
          });
        closeModal()
    }

    useEffect(() => {
        if(review.length >= 10 && rating){
          return setDisable(false)
        } else setDisable(true)
      }, [review, rating, setDisable])


    return (
        <div className="App">
            <form onSubmit={handleSubmit} className='review-box'>
                <h1 className='review-box-header'>How was your stay?</h1>
                {errors && (
                    <p style={{color: 'red'}}>{errors}</p>
                )}
                <textarea
                    className='review-box-textarea'
                    placeholder='Leave your review here...'
                    minLength={10}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                />
                <div className='stars'>
                    {[...Array(5)].map((star, index) => {
                        const currentRating = index + 1;

                        return (
                            <label key={index}>
                                <input
                                type='radio'
                                name='rating'
                                value={currentRating}
                                onClick={() => setRating(currentRating)}
                                required
                                />
                                <FaStar
                                    className='star'
                                    size={50}
                                    key={index}
                                    color={currentRating <= (hover || rating) ? '#000' : '#808080'}
                                    onMouseEnter={() => setHover(currentRating)}
                                    onMouseLeave={() => setHover(null)}
                                    />
                            </label>
                            )

                    })}
                </div>
                <button type='submit' disabled={disable}>Submit Your Review</button>
            </form>
        </div>
     );
}

export default ReviewSpotModal;
