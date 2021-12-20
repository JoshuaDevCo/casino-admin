import { TRANSACTIONS } from "../../constants";

export const transactions_store = (params) => {
    return dispatch => (
        dispatch({
            type : TRANSACTIONS,
            payload : params
        })
    )
}