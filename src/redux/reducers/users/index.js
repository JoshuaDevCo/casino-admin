import { 
    USERS,
    ROLES
} from "../../constants"
  
const Users = (state = {
    users : [],
    roles : []
}, action) => {
    switch (action.type) {
        case USERS: {
            return { ...state, users: action.payload }
        }
        case ROLES: {
            return { ...state, roles: action.payload }
        }
        default: {
            return { ...state }
        }
    }
}
export default Users;