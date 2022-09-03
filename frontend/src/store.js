import {configureStore} from "@reduxjs/toolkit"
import { emailOtp } from "./reducer/emailOtp";
import { creatingChatReducer, creatingGroupChatReducer,  FatchMessageReducer, FatchUserReducer, ForgetPasswordUserReducer, fromReducers, MydataReducer, searchUserReducer, sendMessageReducer, updateReducer, UpdateUserProfileReducer, UserReducers } from "./reducer/userReducer";
const store = configureStore({
    reducer:{
       user:UserReducers,
       emailOtp:emailOtp,
       fromData:fromReducers,
       Medata:MydataReducer,
       searchUserData:searchUserReducer,
       creatingChatFatching:creatingChatReducer,
       FatchUserData:FatchUserReducer,
       GroupChatData:creatingGroupChatReducer,
       updateGroupdata:updateReducer,
       sendChat:sendMessageReducer,
       FatchChat:FatchMessageReducer,
       updateUserData:UpdateUserProfileReducer,
       forgotpasswordData:ForgetPasswordUserReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
});

export default store;

