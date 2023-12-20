
import { CREATE_NEW_MESSAGE, GET_ALL_MESSAGE } from "./ActionType";

const intialState = {
    messages: [],
    newMessage: null,
}
export const messageReducer = (store = intialState, { type, payload }) => {
    if (type === CREATE_NEW_MESSAGE) {
        const { message } = payload;
        return { ...store, newMessage: payload };
    }
    else if (type === GET_ALL_MESSAGE) {
        return { ...store, messages: payload };
    }
    return store;
}