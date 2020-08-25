import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

import reducers from './Reducer/Index.reducer';

export const initStore = ()=> {
    const store = 
        createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
    return store;
}