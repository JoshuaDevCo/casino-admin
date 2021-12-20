import { 
    TOGGLE_DARK_MODE,
} from "../../constants"

export const toggle_dark_mode_store = (params) => {
    return dispatch => (
        dispatch({
            type : TOGGLE_DARK_MODE,
            payload : params
        })
    )
}