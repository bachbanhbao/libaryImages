import { SET_DATA_IMG, SET_FAVORITE } from '../../Actions/app.actions';

const INITIAL_STATE = {
    lstDataSearch: [],
    dataImgFavorites: [],
}

export const libImage = (state = INITIAL_STATE, action) => {
    if (!action) return state;
    const { type, payload } = action;
    switch (type) {
        case SET_DATA_IMG: {
            const { lstDataSearch }  = payload;
            return {
                ...state,
                lstDataSearch,
            }
        }
        case SET_FAVORITE: {
            const { dataImgFavorites }  = payload;
            return {
                ...state,
                dataImgFavorites,
            }
        }
        default: {
            return state;
        }
    }
}