// userActions.js
import axios from 'axios';
import { baseUrl } from '../../api/api';

export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user,
});

export const updateUser = (user) => ({
    type: 'UPDATE_USER',
    payload: user,
});

export const fetchUser = (userId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${baseUrl}user-detail/${userId}/`);
            dispatch(setUser(response.data));
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };
};
