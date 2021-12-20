import { PROVIDERS } from "../../constants";

export const providers_store = (params) => {
    return dispatch => (
        dispatch({
            type : PROVIDERS,
            payload : params
        })
    )
}