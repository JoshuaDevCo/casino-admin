import { 
    SESSION
} from "../../constants"

export const session_store = (params) => {
    return dispatch => (
        dispatch({
            type : SESSION,
            payload : params
        })
    )
}