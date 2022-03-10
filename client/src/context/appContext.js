import React, { useReducer, useContext } from "react";
import axios from 'axios';
import reducer from "./reducer";
import { DISPLAY_ALERT, CLEAR_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR } from "./actions";

const user = localStorage.getItem('user')
const token = localStorage.getItem('token')
const location = localStorage.getItem('location')


const initialState = {
    isLoading: false,
    isAlertShown: false,
    alertText: '',
    alertType: '',
    token: token,
    user: user ? JSON.parse(user) : null,
    userLocation: location || '',
    jobLocation: location || '',
}

const AppContext = React.createContext();

const AppContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT });
        clearAlert()
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 3000)
    }

    const addDataToLocalStorage = (data) => {
        const { user, token, location } = data;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        localStorage.setItem('location', location);
    }

    const removeDataFromLocalStorage = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('location');
    }

    const registerUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN });

        try {
            const response = await axios.post('/api/v1/auth/register', currentUser);

            // console.log(response.data)
            const { user, token, location } = response.data;
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: {
                    user,
                    token,
                    location,
                },
            })

            //after updating our state we will save same thing in local storage as well so that on refresh we do not loose data
            addDataToLocalStorage({ user, token, location })

        } catch (error) {
            // console.log(error.response);
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: {
                    msg: error.response.data.msg
                }
            })
        }

        clearAlert() //invoking clear alert because we are setting isAlertShown to true in both try and catch block
    }

    return (
        <AppContext.Provider value={{ ...state, displayAlert, registerUser }}>
            {children}
        </AppContext.Provider>
    )
}

//creating custom hook so that in every place i do not need to import and execute useContext hook

const useAppContext = () => {
    return useContext(AppContext)
}

export { initialState, AppContextProvider, useAppContext };


