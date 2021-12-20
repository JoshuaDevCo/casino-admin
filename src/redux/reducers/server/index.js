import { GET_SERVER_CONFIG } from "../../constants";

const Servers = (state = {
    config : {}
}, action) => {
    switch (action.type) {
        case GET_SERVER_CONFIG :{
            return { ...state, config : action.payload }
        }
        default: {
            return { ...state }
        }
    }
}
export default Servers;