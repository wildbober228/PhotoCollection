const initialState = {
    error: null,
    loading: false,
    photoSets: []
}

export const FETCH_PHOTOS = 'FETCH_PHOTOS'
export const FETCH_PHOTOS_SUCCESS = 'FETCH_PHOTOS_SUCCESS'
export const FETCH_PHOTOS_ERROR = 'FETCH_PHOTOS_ERROR'

export const photoReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PHOTOS:
            return {...state, loading: true}
        case FETCH_PHOTOS_SUCCESS:
            return {...state, loading: false, photoSets: action.payload, error: ''}
        case FETCH_PHOTOS_ERROR:
            return {...state, loading: false, error: action.payload}
    }
    return state
}
