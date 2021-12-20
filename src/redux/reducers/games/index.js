import { 
    GAMES,
    GAME_TYPES
} from "../../constants";

const Games = (state = {
    games : [],
    gameTypes : []
}, action) => {
    switch (action.type) {
        case GAMES :{
            return { ...state, games : action.payload }
        }
        case GAME_TYPES: {
            return { ...state, gameTypes : action.payload }
        }
        default: {
            return { ...state }
        }
    }
}
export default Games;