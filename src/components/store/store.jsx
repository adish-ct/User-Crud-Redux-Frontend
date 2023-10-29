// store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';



const initialState = {
    user: {},
};


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
            };
        case 'UPDATE_USER':
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    user: userReducer,
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;
