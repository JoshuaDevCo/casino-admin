import { 
    ROLES,
} from "../../constants"

export const roles_store = (params) => {
    return dispatch => (
        dispatch({
            type : ROLES,
            payload : params
        })
    )
}