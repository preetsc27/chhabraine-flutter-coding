import { combineReducers } from "redux";

import songs from "./song.js";
import auth from "./auth.js";

const reducers = combineReducers({ songs, auth });

export default reducers;
