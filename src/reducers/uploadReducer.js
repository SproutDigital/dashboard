import { UPLOADS, SET_UPLOAD } from '../actions/types';

const initialState = {
    uploads: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case UPLOADS:
            return {
                ...state,
                uploads: [...state.uploads, action.payload]
            }
        case SET_UPLOAD:
            return {
                ...state,
                uploads: [...state.uploads, action.payload]
            }
        default:
            return state;
    }
}