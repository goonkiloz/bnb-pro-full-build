import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getSpot } from "../../store/spots"
import { useParams } from "react-router-dom";
import './SpotDetail.css'
import { getSpotReviews } from "../../store/reviews";

function SpotDetailPage() {
    const dispatch = useDispatch()

    const { spotId } = useParams()

    const spotState = useSelector((state) => state.spots[spotId])

    const spot = spotState

    const reviewState = useSelector((state) =>  state.reviews)

    const reviews = Object.values(reviewState)


    console.log(reviews)


    useEffect(() => {
        dispatch(getSpot(spotId))

    }, [dispatch, spotId])

    useEffect(() => {
        dispatch(getSpotReviews(spotId))
    }, [dispatch, spotId])

    const reserveButton = (e) => {
        e.preventDefault()
        window.alert('Feature Coming Soon...')
      }


    return (
        <>
        <div className="spotDetailDiv">
            <h2 className="spotName">{spot?.name}</h2>
            <p className="location">
                {spot?.city}, {spot?.state}, {spot?.country}
            </p>
            <div className="spotImgDiv">
            {spot?.SpotImages?.map(({id, url, preview}) => {
                if(preview === true) {
                    return (
                        <img key={id} src={url} className={`spotImgPreview`} />
                    )
                }
                return (
                    <div key={id}>
                        <img src={url} className='spotImgSingle' />
                    </div>
                )
            })}
            </div>
            <h2 className="ownerName">Hosted by: {spot?.Owner?.firstName} {spot?.Owner?.lastName}</h2>
            <p className="description">{spot?.description}</p>
            <div className="reserveInfo">
                <p className="spotPrice"><span className="priceText">${spot?.price}</span> /Night</p>
                <p className="spotReview">
                    <span className="ReviewText">
                        <span className="starRate">
                            <span>
                                &#9733;
                            </span>
                            {spot?.avgRating}
                        </span>
                    </span>
                    <span className="dotSpan">&#183;</span>
                    <span  className="reviewCount">
                        {spot?.numReview} reviews
                    </span>
                </p>
                <button className="reserveButton" onClick={reserveButton}>Reserve</button>
            </div>
        </div>
        <div className="reviewDiv">
            <div className="reviewDivHead">
            <h2>
            <span className="divReviewText">
                        <span className="DivstarRate">
                            <span>
                                &#9733;
                            </span>
                            {spot?.avgRating}
                        </span>
                    </span>
                    <span>&#183;</span>
                    <span  className="divReviewCount">
                        {spot?.numReview} reviews
                    </span>
            </h2>
            <button className="reviewButton">Post a Review!</button>
            </div>
            {reviews?.map(({review, id, User, createdAt, spotId}) => {


                const dateString = createdAt.split('-')

                const months = [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December'
                ];

                const month = months[dateString[1] - 1]


                const year = dateString[0]

                if (spot?.id === spotId) {
                    return (
                    <div className='review' key={id}>
                        <h2 className="reviewUser">{User.firstName}</h2>
                        <p className="reviewDate">{month} {year}</p>
                        <p className="reviewText">{review}</p>
                    </div>
                    )
                }
            })}
        </div>


        </>
    )
}

export default SpotDetailPage
