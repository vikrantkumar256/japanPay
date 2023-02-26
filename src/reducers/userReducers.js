import { combineReducers } from 'redux';
import { LOGIN_USER, LOGOUT_USER, UPDATE_USER } from './types';

const INITIAL_STATE = {
    isRegister: false,
    email: '',
    name: '',
    id: ''
};

const userReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:
            {
                const isRegister = true;
                const newState = { isRegister, ...action.payload };
                return newState;
            }

        case LOGOUT_USER:
            {
                const isRegister = false;
                const newState = { isRegister, email: "", name: '', id: '' };
                return newState;
            }

        case UPDATE_USER:
            {
                const newState = { ...state, ...action.payload };
                return newState;
            }

        default:
            return state;
    }
};

export default combineReducers({
    user: userReducers

});

{/*

state = {

    todo : {
        todoItems : 
    }
    , 
    auth : {

    },

}



*/}