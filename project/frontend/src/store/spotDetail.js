const GET_SPOT = 'spot/getSpot'

const loadSpot = (spot) => {
    return {
        type: GET_SPOT,
        spot
    }
}


export const getSpot = (spotId) => async(dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`)

    if(response.ok) {
        const data = await response.json()
        dispatch(loadSpot(data))
        return data;
    }
}

const initaialState = {};


const spotReducer = (state = initaialState, action) => {

    switch (action.type) {
        case GET_SPOT: {
            const newState = { ...state}
            console.log(action)
            newState[action.spot.id] = action.spot
            return newState
        }
        default:
            return state;
    }
}

export default spotReducer;
