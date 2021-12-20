import { 
    TOGGLE_DARK_MODE,
} from "../../constants"
  
const Config = (state = {
    isDarkMode : false,
}, action) => {
    switch (action.type) {
        case TOGGLE_DARK_MODE: {
            return { ...state, isDarkMode: action.payload }
        }
        default: {
            return { ...state }
        }
    }
}
export default Config;