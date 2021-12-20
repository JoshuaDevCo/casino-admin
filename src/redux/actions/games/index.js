import { GAMES, GAME_TYPES } from "../../constants";

export const gameTypes_store = (params) => {
    return dispatch => (
        dispatch({
            type : GAME_TYPES,
            payload : params
        })
    )
}

export const games_store = (params) => {
    return dispatch => (
        dispatch({
            type : GAMES,
            payload : params
        })
    )
}