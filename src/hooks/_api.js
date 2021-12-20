import Axios from "./_axios";
// ** Declare Auth API
export const signin = async (params) => {
    const result = await Axios({
        endpoint : "/auth/signin",
        method : "POST",
        params : params
    });
    return result;
}
// ** Declare Game Types API
export const getGameTypes = async () => {
    const result = await Axios({
        endpoint : "/games/getGameTypes",
        method : "GET",
    });
    return result;
}
export const addNewGameType = async (params) => {
    const result = await Axios({
        endpoint : "/games/addNewGameType",
        method : "POST",
        params : params
    })
    return result;
}
export const updateGameType = async (params) => {
    const result = await Axios({
        endpoint : "/games/updateGameType",
        method : "POST",
        params : params
    })
    return result;
}
export const removeGameTypes = async (params) => {
    const result = await Axios({
        endpoint : "/games/removeGameTypes",
        method : "POST",
        params : params
    });
    return result;
}
export const enableGameTypes = async (params) => {
    const result = await Axios({
        endpoint : "/games/enableGameTypes",
        method : "POST",
        params : params
    });
    return result;
}
export const disableGameTypes = async (params) => {
    const result = await Axios({
        endpoint : "/games/disableGameTypes",
        method : "POST",
        params : params
    });
    return result;
}
// ** Declare Games API
export const getGames = async (params) => {
    const result = await Axios({
        endpoint : "/games/getGames",
        method : "POST",
        params : params
    })
    return result;
}
export const addNewGame = async (params) => {
    const result = await Axios({
        endpoint : "/games/addNewGames",
        method : "POST",
        params : params
    })
    return result;
}
export const updateGame = async (params) => {
    const result = await Axios({
        endpoint : "/games/updateGame",
        method : "POST",
        params : params
    })
    return result;
}
export const removeGames = async (params) => {
    const result = await Axios({
        endpoint : "/games/removeGames",
        method : "POST",
        params : params
    });
    return result;
}
export const enableGames = async (params) => {
    const result = await Axios({
        endpoint : "/games/enableGames",
        method : "POST",
        params : params
    });
    return result;
}
export const disableGames = async (params) => {
    const result = await Axios({
        endpoint : "/games/disableGames",
        method : "POST",
        params : params
    });
    return result;
}
// ** Declare Users API
export const getUsers = async () => {
    const result = await Axios({
        endpoint : "/users/getUsers",
        method : "GET"
    })
    return result;
}
export const addNewUser = async (params) => {
    const result = await Axios({
        endpoint : "/users/addNewUser",
        method : "POST",
        params : params
    })
    return result;
}
export const updateUser = async (params) => {
    const result = await Axios({
        endpoint : "/users/updateUser",
        method : "POST",
        params : params
    })
    return result;
}
export const removeUsers = async (params) => {
    const result = await Axios({
        endpoint : "/users/removeUsers",
        method : "POST",
        params : params
    });
    return result;
}
export const enableUsers = async (params) => {
    const result = await Axios({
        endpoint : "/users/enableUsers",
        method : "POST",
        params : params
    });
    return result;
}
export const blockUsers = async (params) => {
    const result = await Axios({
        endpoint : "/users/blockUsers",
        method : "POST",
        params : params
    });
    return result;
}
export const depositUser = async (params) => {
    const result = await Axios({
        endpoint : "/users/depositUser",
        method : "POST",
        params : params
    });
    return result;
}
// ** Declare Players API
export const getPlayers = async () => {
    const result = await Axios({
        endpoint : "/players/getPlayers",
        method : "GET"
    })
    return result;
}
export const addNewPlayer = async (params) => {
    const result = await Axios({
        endpoint : "/players/addNewPlayer",
        method : "POST",
        params : params
    })
    return result;
}
export const updatePlayer = async (params) => {
    const result = await Axios({
        endpoint : "/players/updatePlayer",
        method : "POST",
        params : params
    })
    return result;
}
export const removePlayers = async (params) => {
    const result = await Axios({
        endpoint : "/players/removePlayers",
        method : "POST",
        params : params
    });
    return result;
}
export const enablePlayers = async (params) => {
    const result = await Axios({
        endpoint : "/players/enablePlayers",
        method : "POST",
        params : params
    });
    return result;
}
export const blockPlayers = async (params) => {
    const result = await Axios({
        endpoint : "/players/blockPlayers",
        method : "POST",
        params : params
    });
    return result;
}
export const depositPlayer = async (params) => {
    const result = await Axios({
        endpoint : "/players/depositPlayer",
        method : "POST",
        params : params
    });
    return result;
}
// ** Declare Providers API
export const getProviders = async (params) => {
    const result = await Axios({
        endpoint : "/providers/getProviders",
        method : "POST",
        params : params
    })
    return result;
}
export const addNewProvider = async (params) => {
    const result = await Axios({
        endpoint : "/providers/addNewProvider",
        method : "POST",
        params : params
    })
    return result;
}
export const updateProvider = async (params) => {
    const result = await Axios({
        endpoint : "/providers/updateProvider",
        method : "POST",
        params : params
    })
    return result;
}
export const removeProviders = async (params) => {
    const result = await Axios({
        endpoint : "/providers/removeProviders",
        method : "POST",
        params : params
    });
    return result;
}
export const enableProviders = async (params) => {
    const result = await Axios({
        endpoint : "/providers/enableProviders",
        method : "POST",
        params : params
    });
    return result;
}
export const disableProviders = async (params) => {
    const result = await Axios({
        endpoint : "/providers/disableProviders",
        method : "POST",
        params : params
    });
    return result;
}
// ** Declare Roles API
export const getRoles = async () => {
    const result = await Axios({
        endpoint : "/users/getRoles",
        method : "GET",
    });
    return result;
}
export const addNewRole = async (params) => {
    const result = await Axios({
        endpoint : "/users/addNewRole",
        method : "POST",
        params : params
    });
    return result;
}
export const updateRole = async (params) => {
    const result = await Axios({
        endpoint : "/users/updateRole",
        method : "POST",
        params : params
    });
    return result;
}
export const removeRoles = async (params) => {
    const result = await Axios({
        endpoint : "/users/removeRoles",
        method : "POST",
        params : params
    });
    return result;
}
export const enableRoles = async (params) => {
    const result = await Axios({
        endpoint : "/users/enableRoles",
        method : "POST",
        params : params
    });
    return result;
}
export const disableRoles = async (params) => {
    const result = await Axios({
        endpoint : "/users/disableRoles",
        method : "POST",
        params : params
    });
    return result;
}
// Declare Transactions API
export const getTransactions = async () => {
    const result = await Axios({
        endpoint : "/finance/getTransactions",
        method : "GET"
    });
    return result;
}