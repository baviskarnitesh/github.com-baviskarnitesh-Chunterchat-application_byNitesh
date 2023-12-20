import { CREATE_CHAT, CREATE_GROUP, GET_USERS_CHAT } from "./ActionType"

 export const intialValue={
    chats:[],
    createdGroup:null,
    createdChat:null,
}
 export const chatReducer=(store=intialValue,{type,payload})=>{
   if(type===CREATE_CHAT){
    return{...store,createdChat:payload}
   }
     else if(type===CREATE_GROUP){
        return{...store,createdGroup:payload}
     }
     else if(type===GET_USERS_CHAT){
        return{...store,chats:payload}
     }
     return store;
}