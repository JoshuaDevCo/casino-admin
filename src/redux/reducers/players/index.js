import { 
    PLAYERS,
} from "../../constants"
  
const Players = (state = {
    players : []
}, action) => {
    switch (action.type) {
        case PLAYERS: {
            return { ...state, players: action.payload }
        }
        default: {
            return { ...state }
        }
    }
}
export default Players;