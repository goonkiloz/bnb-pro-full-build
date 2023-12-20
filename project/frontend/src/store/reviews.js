import { csrfFetch } from "./csrf"

const GET_SPOT_REVIEWS = 'review/getSpotReviews'
const CREATE_REVIEW = 'review/createReview'
const UPDATE_REVIEW = 'review/updateReview'
const DELETE_REVIEW = 'review/deleteReview'

const loadReviews = (reviews) => {
    return {
        type: GET_SPOT_REVIEWS,
        reviews
    }
}

const postReview = (payload) => {
    return {
        type: CREATE_REVIEW,
        payload
    }
}

const fixReview = (payload) => {
    return {
        type: UPDATE_REVIEW,
        payload
    }
}

const removeReview = (payload) => {
    return {
        type: DELETE_REVIEW,
        payload
    }
}

export const getSpotReviews = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}/reviews`)

    if(res.ok) {
        const data = await res.json()
        dispatch(loadReviews(data.Reviews))
        return data;
    }
}

export const createReview = (spotId, review) => async(dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(postReview(data))
        return data;
    }
}

export const updateReview = (review) => async(dispatch) => {
    const res = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(review)
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(fixReview(data))
        return data;
    }
}

export const deleteReview = (reviewId) => async(dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json'
        }
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(removeReview(data))
        return data
    }
}

const initaialState = {};

const reviewsReducer = (state = initaialState, action) => {
    const newState = { ...state }

    switch(action.type) {
        case GET_SPOT_REVIEWS: {
            action.reviews.forEach((review) => {
                if(newState[review.id]){
                    newState[review.id] = { ...newState[review.id], ...review}
                }else {
                    newState[review.id] = review
                }
            });
            return newState
        }
        case CREATE_REVIEW: {
            newState[action.payload.id] = action.payload
            return newState;
        }
        case UPDATE_REVIEW: {
            newState[action.payload.id] = action.payload
            return newState;
        }
        case DELETE_REVIEW: {
            delete newState[action.payload]
            return newState;
        }
        default:
            return state
    }
}

export default reviewsReducer
