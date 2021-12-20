import { combineReducers } from "redux";
import auth from "./auth";
import users from "./users";
import players from "./players";
import providers from "./providers";
import server from "./server";
import games from "./games";
import finance from "./finance";
import config from "./config";

const rootReducer = combineReducers({
  auth : auth,
  users : users,
  providers : providers,
  server : server,
  games : games,
  players : players,
  finance : finance,
  config: config
})

export default rootReducer
