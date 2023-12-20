import { csrfFetch } from "./csrf"
import Cookies from "js-cookie";

const GET_ALL_SPOTS = 'spot/getAllSpots'
const GET_SPOT = 'spot/getSpot'
const GET_USER_SPOTS = 'spot/getUserSpots'
const CREATE_SPOT = 'spot/createSpot'
const UPDATE_SPOT = 'spot/updateSpot'
const DELETE_SPOT = 'spot/deleteSpot'
const CREATE_SPOT_IMAGE = 'spot/createSpotImage'

const loadSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
}

const loadSpot = (spot) => {
    return {
        type: GET_SPOT,
        spot
    }
}

const loadUserSpots = (spots) => {
    return {
        type: GET_USER_SPOTS,
        spots
    }
}

const newSpot = (payload) => {
    return {
        type: CREATE_SPOT,
        payload
    }
}

const spotUpdate = (payload) => {
    return {
        type:UPDATE_SPOT,
        payload
    }
}

const removeSpot = (payload) => {
    return {
        type: DELETE_SPOT,
        payload
    }
}

const newSpotImage = (payload) => {
    return {
        type: CREATE_SPOT_IMAGE,
        payload
    }
}

export const getAllSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots')

    if(response.ok) {
        const data = await response.json()
        dispatch(loadSpots(data.Spots))
        return data;
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

export const getUserSpots = () => async(dispatch) => {
    const response = await csrfFetch('/api/spots/current')

    if(response.ok) {
        const data = await response.json()
        dispatch(loadUserSpots(data.Spots))
        return data
    }
}

export const createSpot = (spot) => async(dispatch) => {
    const res = await  csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(spot)
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(newSpot(data))
        return data
    } else {
        const err = await res.json()
        return err;
    }
}

export const updateSpot = (spotId, spot) => async(dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spot)
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(spotUpdate(data))
        return data
    } else {
        const err = await res.json()
        return err;
    }

}

export const deleteSpot = (spotId) => async(dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(removeSpot(spotId));
        return data;
    } else {
        const err = await res.json();
        return err;
    }
}

export const createSpotImage = (spotId, formData) => async(dispatch) => {
    const options = {
        method: 'POST',
        headers: {},
        body: formData
    }

    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN')


    const res = await fetch(`/api/spots/${spotId}/images`, options)

    if (res.ok) {
        const data = res.body
        dispatch(newSpotImage(data))
        return data
    }
}

const initaialState = {};

const spotsReducer = (state = initaialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case GET_ALL_SPOTS: {
            action.spots.forEach((spot) => {
                if(newState[spot.id]){
                    newState[spot.id] = {...newState[spot.id], ...spot}
                } else {
                    newState[spot.id] = spot
                }
            })
            return newState;
        }
        case GET_SPOT: {
            newState[action.spot.id] = {...newState[action.spot.id], ...action.spot}
            return newState;
        }
        case GET_USER_SPOTS: {
            action.spots.forEach((spot) => {
                if(newState[spot.id]){
                    newState[spot.id] = {...newState[spot.id], ...spot}
                } else {
                    newState[spot.id] = spot
                }
            })
            return newState;
        }
        case CREATE_SPOT: {
            newState[action.payload.id] = action.payload
            return newState;
        }
        case UPDATE_SPOT: {
            newState[action.payload.id] = action.payload
            return newState;
        }
        case DELETE_SPOT: {
            delete newState[action.payload]
            return newState;
        }
        default:
            return state;
    }
}

export default spotsReducer;
