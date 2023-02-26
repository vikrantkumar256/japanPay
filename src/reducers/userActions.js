import { LOGIN_USER, LOGOUT_USER, DELETE_USER, UPDATE_USER } from "./types";

export const loginUser = ({ email, name, id }) => (
    {
        type: LOGIN_USER,
        payload: { email, name, id },
    }
);

export const logoutUser = id => (
    {
        type: LOGOUT_USER
    }
)


export const updateUser = ({ email, name, id }) => (
    {
        type: UPDATE_USER,
        payload: { email, name, id }
    }
)