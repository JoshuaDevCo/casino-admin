import { 
    PLAYERS,
} from "../../constants"

export const players_store = (params) => {
    return dispatch => (
        dispatch({
            type : PLAYERS,
            payload : params
        })
    )
}