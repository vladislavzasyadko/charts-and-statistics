import { chartsAPI } from '../api/api'

const SET_DATA = 'SET-DATA';

let initialState = {
    data: [1, 2, 3, 4, 5, 6, 7, 8]
}

const chartsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA: {
            //console.log('setting data', action.data)
            return { data: action.data }
        }
        
        default:
            return state;
    }
}

export const setData = (data) => ({type:SET_DATA, data})

export const getData = () => {
    return (dispatch) => {
        chartsAPI.getData().then(response => {
            //console.log('reducer', response.data)
            dispatch(setData(response.data));
        });
    }
}

export default chartsReducer;