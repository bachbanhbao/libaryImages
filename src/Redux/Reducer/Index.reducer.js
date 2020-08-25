import { combineReducers } from 'redux';
import { libImage } from './LibaryImg/img.reducer';

const appReducer = combineReducers({
    libImage,
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
