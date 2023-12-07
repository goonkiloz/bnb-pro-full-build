const GET_ALL_SPOTS = 'spot/getAllSpots'
const CREATE_SPOT = 'spot/create'

const loadSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
}

export const getAllSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots')

    if(response.ok) {
        const data = await response.json()
        dispatch(loadSpots(data))
        return data;
    }
}

const initaialState = {};

const spotsReducer = (state = initaialState, action) => {
    const newState = { ...state }

    switch (action.type) {
        case GET_ALL_SPOTS: {
            const newState = {};
            console.log(action)
            action.spots.Spots.forEach((spot) => (newState[spot.id] = spot))
            return newState;
        }
        default:
            return state;
    }
}

export default spotsReducer;
