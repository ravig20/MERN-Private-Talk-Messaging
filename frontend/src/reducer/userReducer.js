import { createReducer } from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated: false,
};
export const UserReducers = createReducer(initialState, {
    LoginRequest: (state) => {
        state.loading = true;
        state.isAuthenticated = false
    },
    LoginSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true
    },
    LoginFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false
    },
    RegisterRequest: (state) => {
        state.loading = true;
        state.isAuthenticated = false
    },
    RegisterSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true
    },
    RegisterFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false
    },
    LodeUserRequest: (state) => {
        state.loading = true;
        state.isAuthenticated = false
    },
    LodeUserSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true
    },
    LodeUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false
    },
    logoutRequest: (state, action) => {
        state.loading = true;

    },

    logoutSuccess: (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;


    },
    logoutFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = true;

    },
    clearMessage: (state, action) => {
        state.user = null;
    },
    clearError: (state, action) => {
        state.error = null;
    },

})

export const fromReducers = createReducer(initialState, {

    fromReducers: (state, action) => {
        state.fomeData = action.payload;
    },
    otpReducer: (state, action) => {
        state.otpSendEmail = action.payload;
    },
    SelectedChatReducer: (state, action) => {
        state.SelectedChatData = action.payload;
    },
    clearSelectedChatReducer: (state, action) => {
        state.SelectedChatData = "";

    },
});

export const MydataReducer = createReducer(initialState, {
    // login user ka data 
    medataRequest: (state, action) => {
        state.loading = true;
        state.isAuthenticated = false;    },
    medataSusscess: (state, action) => {
        state.meinfo = action.payload;
        state.isAuthenticated = true;
    },
    medataFailure: (state, action) => {
        state.error = action.payload;
        state.isAuthenticated = false; 
    },

    cleardataReducer: (state, action) => {
        state.isAuthenticated = false;
        state.meinfo = null;
        state.error = null;

    }
});


export const searchUserReducer = createReducer(initialState, {
    searchUserRequest: (state, action) => {
        state.loading = true;

    },
    searchUserSuccess: (state, action) => {
        state.loading = false;
        state.searchUser = action.payload;
    },
    searchUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearError: (state, action) => {
        state.error = null;
    },
    clearsearchUserData: (state, action) => {
        state.searchUser = null;
    },

})


export const creatingChatReducer = createReducer(initialState, {
    creatingChatRequest: (state, action) => {
        state.loading = true;

    },
    creatingChatSuccess: (state, action) => {
        state.loading = false;
        state.searchUser = action.payload;
    },
    creatingChatFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearError: (state, action) => {
        state.error = null;
    }
})


export const FatchUserReducer = createReducer(initialState, {
    FatchUserRequest: (state, action) => {
        state.loading = true;
        state.isAuthenticated = true;
    },
    FatchUserSuccess: (state, action) => {
        state.loading = false;
        state.fatchUserData = action.payload;
        state.isAuthenticated = true;
    },
    FatchUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = true;
    },
    clearFatchUser: (state, action) => {
        state.fatchUserData = null;
    }
    ,
    clearError: (state, action) => {
        state.error = null;
    }
})



export const creatingGroupChatReducer = createReducer(initialState, {
    creatingGroupChatRequest: (state, action) => {
        state.loading = true;
  
    },
    creatingGroupChatSuccess: (state, action) => {
        state.loading = false;
        state.CreatedGroupChatData = action.payload;
    
    },
    creatingGroupChatFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
       
    },
    clearUpdateDataUser: (state, action) => {
        state.creatingGroupData = null;
    }
    ,
    clearError: (state, action) => {
        state.error = null;
    }
})


// UPDATING USER I GROUP
export const updateReducer = createReducer(initialState, {
    updateGroupProfleRequest: (state, action) => {
        state.loading = true;
  
    },
    updateGroupProfleSuccess: (state, action) => {
        state.loading = false;
        state.CreatedGroupChatData = action.payload;
    
    },
    updateGroupProfleFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        
    },
    addingUserToGroupRequest: (state, action) => {
        state.loading = true;
  
    },
    addingUserToGroupSuccess: (state, action) => {
        state.loading = false;
        state.CreatedGroupChatData = action.payload;
    
    },
    addingUserToGroupFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        
    },
    removingUserToGroupRequest: (state, action) => {
        state.loading = true;
  
    },
    removingUserToGroupSuccess: (state, action) => {
        state.loading = false;
        state.CreatedGroupChatData = action.payload;
    
    },
    removingUserToGroupFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        
    },
    deleteGroupRequest: (state, action) => {
        state.loading = true;
  
    },
    deleteGroupSuccess: (state, action) => {
        state.loading = false;
        state.CreatedGroupChatData = action.payload;
    
    },
    deleteGroupFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        
    },
    leaveGroupRequest: (state, action) => {
        state.loading = true;
  
    },
    leaveGroupSuccess: (state, action) => {
        state.loading = false;
        state.CreatedGroupChatData = action.payload;
    
    },
    leaveGroupFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        
    },
    clearUpdate: (state, action) => {
        state.creatingGroupData = null;
    }
    ,
    clearError: (state, action) => {
        state.error = null;
    }
})


export const FatchMessageReducer = createReducer(initialState, {
    FatchMessageRequest: (state, action) => {
        state.loading = true;
        state.isAuthenticated = true;
    },
    FatchMessageSuccess: (state, action) => {
        state.loading = false;
        state.FatchMessageData = action.payload;
        state.isAuthenticated = true;
    },
    FatchMessageFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = true;
    },
  
})


export const sendMessageReducer = createReducer(initialState, {
    sendMessageRequest: (state, action) => {
        state.loading = true;
        state.isAuthenticated = true;
    },
    sendMessageSuccess: (state, action) => {
        state.loading = false;
        state.sendMessageData = action.payload;
        state.isAuthenticated = true;
    },
    sendMessageFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = true;
    }
})

export const UpdateUserProfileReducer = createReducer(initialState, {

    sendUpdateUserProfileRequest: (state, action) => {
        state.loading = true;
        state.isAuthenticated = true;
    },
    sendUpdateUserProfileSuccess: (state, action) => {
        state.loading = false;
        state.updateUserData = action.payload;
        state.isAuthenticated = true;
    },
    sendUpdateUserProfileFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = true;
    },
    clearErrorFromUpdateUserProfileReducer: (state, action) => {
        state.error = null;
    },
    clearStateFromUpdateUserProfileReducer: (state, action) => {
        state.updateUserData = null;
    },
});


export const ForgetPasswordUserReducer = createReducer(initialState, {
    sendForgetPasswordRequest: (state, action) => {
        state.loading = true;
        state.isAuthenticated = true;
    },
    sendForgetPasswordSuccess: (state, action) => {
        state.loading = false;
        state.forgotPasswordData = action.payload;
        state.isAuthenticated = true;
    },
    sendForgetPasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = true;
    },
    clearErrorFromForgetPasswordUserReducer: (state, action) => {
        state.error = null;
    },
    clearStateFromForgetPasswordUserReducer: (state, action) => {
        state.forgotPasswordData = null;
    },
   
})


