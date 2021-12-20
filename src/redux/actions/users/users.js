import { 
    USERS,
} from "../../constants"

export const users_store = (params) => {
    return dispatch => (
        dispatch({
            type : USERS,
            payload : params
        })
    )
}

export const updateUser = async params => {
    // const data = await Theme.request({
    //     endpoint : "users/updateUser",
    //     method : "POST",
    //     params : params,
    //     rtype: "await"
    // });
    // return data;
}

export const blockSelectedUsers = async params => {
    // const data = await Theme.request({
    //     endpoint : "users/blockSelectedUsers",
    //     method : "POST",
    //     params : params,
    //     rtype: "await"
    // });
    // return data;
}

export const removeSelectedUsers = async params => {
    // const data = await Theme.request({
    //     endpoint : "users/removeSelectedUsers",
    //     method : "POST",
    //     params : params,
    //     rtype: "await"
    // });
    // return data;
}

export const enableSelectedUsers = async params => {
    // const data = await Theme.request({
    //     endpoint : "users/enableSelectedUsers",
    //     method : "POST",
    //     params : params,
    //     rtype: "await"
    // });
    // return data;
}

export const createNewUser = async params => {
    // const data = await Theme.request({
    //     endpoint : "users/createNewUser",
    //     method : "POST",
    //     params : params,
    //     rtype: "await"
    // });
    // return data;
}