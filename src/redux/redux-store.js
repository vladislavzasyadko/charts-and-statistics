import chartsReducer from "./chartsReducer";
import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

let reducers = combineReducers({
    chartsData: chartsReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;