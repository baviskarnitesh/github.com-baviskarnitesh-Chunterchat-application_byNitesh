import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { AuthReducer } from "./Auth/Reducer";
import { chatReducer } from "./Chat/Reducer";
import { messageReducer } from "./Message/Reducer";

const rootReducer = combineReducers({
    auth: AuthReducer,


    message: messageReducer,
    chat: chatReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))