import { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import ReviewSpotModal from "./ReviewSpotModal";
import DeleteReviewModal from "./DeleteReviewModal";


function LoggedInPage () {
    const [reviewText, setReviewText] = useState('')
    const [review, setReviews] = useState(false)

    const userState = useSelector((state) => state.session)

    const { spotId } = useParams()

    const spotState = useSelector((state) => state.spots[spotId])

    const spot = spotState

    const reviewState = useSelector((state) =>  state.reviews)

    const reviews = Object.values(reviewState).filter((review) => {
        if(review.spotId === Number(spotId)) return true
        return false;
    }).sort(function (a, b) {
        const keyA = new Date(a.createdAt)
        const keyB = new Date(b.createdAt)
                if(keyA > keyB) return -1;
                if(keyA < keyB) return 1;
            return 0;
    })

    useEffect(() => {
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

    const reviewCheck = () => {
        let userIds = []

        reviews?.forEach(({userId}) => {
            userIds.push(userId)
        })

        if(userIds.includes(userState?.user?.id)) {
            userIds = []
            return true;
        }
        userIds = []
        return false;
    }


    const reserveButton = (e) => {
        e.preventDefault()
        window.alert('Feature Coming Soon...')
    }

    if(reviewCheck()) {
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
                                    {spot?.avgRating}
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

                        if(User?.id === userState?.user?.id) {
                            return (
                                <div className='review' key={id}>
                                    <h2 className="reviewUser">{User?.firstName}</h2>
                                    <p className="reviewDate">{month} {year}</p>
                                    <p className="reviewText">{review}</p>
                                    <button>Edit Review</button>
                                    <OpenModalButton
                                        buttonText={'Delete'}
                                        modalComponent={<DeleteReviewModal reviewId={id} spotId={spotId}/>}
                                    />
                                </div>
                            )
                        }
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

        if(review){
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
                                            {spot?.avgRating}
                                        </span>
                                    </span>
                                    <span>&#183;</span>
                                    <span  className="divReviewCount">
                                        {spot?.numReview} {reviewText}
                                    </span>
                            </h2>
                            <OpenModalButton
                                className='reviewButton'
                                buttonText={'Post Your Review!'}
                                modalComponent={<ReviewSpotModal spotId={spotId} />}
                            />
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

                                if(User?.id === userState?.user?.id) {
                                    return (
                                        <div className='review' key={id}>
                                            <h2 className="reviewUser">{User?.firstName}</h2>
                                            <p className="reviewDate">{month} {year}</p>
                                            <p className="reviewText">{review}</p>
                                            <button>Edit Review</button>
                                            <OpenModalButton
                                                buttonText={'Delete'}
                                                modalComponent={<DeleteReviewModal reviewId={id} spotId={spotId}/>}
                                            />
                                        </div>
                                    )
                                }
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
                } else if (!review) {
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
                    <OpenModalButton
                        className='reviewButton'
                        buttonText={'Post Your Review!'}
                        modalComponent={<ReviewSpotModal spotId={spotId}/>}
                    />
                </div>
                <h3>Be The First To Post A Review!</h3>
            </div>
        </>
        )
    }
}

export default LoggedInPage;
