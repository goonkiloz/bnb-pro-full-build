const GET_SPOT_REVIEWS = 'review/getSpotReviews'

const loadReviews = (reviews) => {
    return {
        type: GET_SPOT_REVIEWS,
        reviews
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

const initaialState = {};

const reviewsReducer = (state = initaialState, action) => {

    switch(action.type) {
        case GET_SPOT_REVIEWS: {
            const newState = { ... state}
            action.reviews.forEach((review) => {
                if(newState[review.id]){
                    newState[review.id] = { ...newState[review.id], ...review}
                }else {
                    newState[review.id] = review
                }
            });
            return newState
        }
        default:
            return state
    }
}

export default reviewsReducer
