import { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom";


function LoggedOutPage () {

    const [reviewText, setReviewText] = useState('')
    const [review, setReviews] = useState(false)

    const { spotId } = useParams()

    const spotState = useSelector((state) => state.spots[spotId])

    const spot = spotState

    const reviewState = useSelector((state) =>  state.reviews)

    const reviews = Object.values(reviewState).filter((review) => {
        if(review.spotId === Number(spotId)) return true
        return false;
    })

    useEffect(() => {
        console.log(reviews)
        if(reviews?.length === 0) {
            return setReviews(false)
        }else if (reviews?.length === 1) {
            setReviews(true)
            return setReviewText('Review')
        }else {
            setReviews(true)
            return setReviewText('Reviews')
        }
    },[setReviewText, reviews, setReviews])

    const reserveButton = (e) => {
        e.preventDefault()
        window.alert('Feature Coming Soon...')
    }

    if (!review) {
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
                                New
                            </span>
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
                            New
                        </span>
                    </span>
                </h2>
                </div>
            </div>
            </>
        )
    } else if (review) {
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
                                {parseFloat(spot?.avgRating).toFixed(1)}
                            </span>
                        </span>
                        <span className="dotSpan">&#183;</span>
                        <span  className="reviewCount">
                            {spot?.numReview} {reviewText}
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
                                {parseFloat(spot?.avgRating).toFixed(1)}
                            </span>
                        </span>
                        <span>&#183;</span>
                        <span  className="divReviewCount">
                            {spot?.numReview} {reviewText}
                        </span>
                </h2>
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
                                <h2 className="reviewUser">{User?.firstName}</h2>
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
}


export default LoggedOutPage;
