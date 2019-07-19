import { CREATE_COMPANY_PROFILE, GET_COMPANY_PROFILES, ADD_ORGANIZER, FIND_COMPANY, UPDATE_COMPANY } from '../actions/types';

const initialState = {
    companyProfile: {},
    companyProfiles: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case CREATE_COMPANY_PROFILE:
            return {
                ...state,
                companyProfile: action.payload,
            }
        case GET_COMPANY_PROFILES:
            return {
                ...state,
                companyProfiles: action.payload,
            }
        case ADD_ORGANIZER:
            return {
                ...state,
                companyProfile: action.payload,
            }
        case FIND_COMPANY:
            return {
                ...state,
                companyProfile: action.payload,
            }
        case UPDATE_COMPANY:
            return {
                ...state,
                companyProfile: action.payload,
            }
        default:
            return state;
    }
}