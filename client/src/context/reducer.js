import { DISPLAY_ALERT, CLEAR_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR } from "./actions";
const reducer = (state, action) => {

    if (action.type === DISPLAY_ALERT) {
        return {
            ...state,
            isAlertShown: true,
            alertText: 'Please provide all values',
            alertType: 'danger',
        }
    }

    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            isAlertShown: false,
            alertText: '',
            alertType: ''
        }
    }

    if (action.type === REGISTER_USER_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }

    if (action.type === REGISTER_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            isAlertShown: true,
            alertText: 'User Created Successfully!! redirecting...',
            alertType: 'success',
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
        }
    }

    if (action.type === REGISTER_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            isAlertShown: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }

    if (action.type === LOGIN_USER_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    }

    if (action.type === LOGIN_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            isAlertShown: true,
            alertType: 'success',
            alertText: 'Logged in Successfully!! redirecting....',
        }
    }

    if (action.type === LOGIN_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            isAlertShown: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }


    throw new Error(`No Such Action: ${action.type}`)
}

export default reducer;