import axios from 'axios';

export const SET_DATA_IMG = 'SET_DATA_IMG';
export const SET_FAVORITE = 'SET_FAVORITE';

export const searchImages = (keyword) => async (dispatch, getState) => {
    return await axios.get('https://api.giphy.com/v1/gifs/search?api_key=vXnwdwI4bgr0TpunaqqzdF7J05wboJC3&q=' + keyword + '&limit=40&offset=0&rating=g&lang=en')
    .then(response => {     
        const lstDataSearch = response.data.data;
        dispatch(_setLstDataSearch({lstDataSearch}));
    })
}

export const addFavorite = (dataImgFavorites) => (dispatch, getState) => {
    return dispatch(_setFavorite({dataImgFavorites}));
}

const _setLstDataSearch = (data) => ({
    type: SET_DATA_IMG,
    payload: {
        ...data
    }
});

const _setFavorite = (data) => ({
    type: SET_FAVORITE,
    payload: {
        ...data
    }
});
