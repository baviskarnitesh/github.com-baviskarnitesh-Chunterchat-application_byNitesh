import { CREATE_STATUS, GET_STATUS_BY_ID } from "./ActionType";

const initialState = {
    createdStatus: null,
    findById: null,
}
export const statusReducer = (store = initialState, { type, payload }) => {
    switch (type) {
        case CREATE_STATUS:
          return { ...store, createdStatus: payload };
        case GET_STATUS_BY_ID:
          return { ...store, findById: payload };
        default:
          return store;
}
};