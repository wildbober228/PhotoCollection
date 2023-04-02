import {FETCH_PHOTOS, FETCH_PHOTOS_ERROR, FETCH_PHOTOS_SUCCESS} from "../reducers/photoReducer";
import axios from "axios";


export const fetchPhotoSets = (categoryId, page = 1, limit = 3) => {
    return async (dispatch) => {
        try {
            dispatch({type: FETCH_PHOTOS})
            const response = await axios.get(`https://6421b86934d6cd4ebd7a56b6.mockapi.io/photo_collections`, {
                params: {category: categoryId ? categoryId : '', limit, page}
            })
            dispatch({type: FETCH_PHOTOS_SUCCESS, payload: response.data})
        } catch (e) {
            dispatch({
                type: FETCH_PHOTOS_ERROR,
                payload: "ERROR WITH FETCHING PHOTOS" + e
            })
        }
    }
}
