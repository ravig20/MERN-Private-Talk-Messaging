import {createReducer} from "@reduxjs/toolkit"
const initialState ={
    isAuthenticated: false,
};
export const emailOtp = createReducer(initialState,{
    emailOtpRequest:(state)=>{
        state.loading = true;
    },
    emailOtpSusscess:(state,action)=>{
        state.loading = false;
        state.data = action.payload;
    },
    emailOtpFailure:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    clearOtpdata:(state,action)=>{
        state.data = null;
    },
    clearOtpError:(state,action)=>{
        state.error = null;
    }
});