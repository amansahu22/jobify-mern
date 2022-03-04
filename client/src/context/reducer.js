import { DISPLAY_ALERT, CLEAR_ALERT } from "./actions";
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
    throw new Error(`No Such Action: ${action.type}`)
}

export default reducer;