import { 
    TRANSACTIONS,
} from "../../constants"
  
const Finance = (state = {
    transactions : []
}, action) => {
    switch (action.type) {
        case TRANSACTIONS: {
            return { ...state, transactions: action.payload }
        }
        default: {
            return { ...state }
        }
    }
}
export default Finance;