import { PROVIDERS } from "../../constants";

const Providers = (state = {
    providers : []
}, action) => {
    switch (action.type) {
        case PROVIDERS :{
            return { ...state, providers : action.payload }
        }
        default: {
            return { ...state }
        }
    }
}
export default Providers;