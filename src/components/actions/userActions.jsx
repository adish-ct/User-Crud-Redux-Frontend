// userActions.js
import axios from 'axios';
import { baseUrl } from '../../api/api';

export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user,
});

export const updateUser = (user) => {
    return async (dispatch) => {
        try {
            // Your API call or logic here
            console.log(user);
            const response = await axios.put(`${baseUrl}user-detail/${user.userId}/`, user);
            dispatch({ type: 'UPDATE_USER', payload: response.data });
            return response.data
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
};

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
