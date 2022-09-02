import {createReducer} from "@reduxjs/toolkit"
const initialState = {};
export const roughReducer = createReducer(initialState,{
    roughReducerRequest:(state)=>{
        state.loading = true;
    },
    roughReducerSusscess:(state,action)=>{
        state.loading = false;
        state.like = action.payload;
    },
    roughReducerFailure:(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    roughReducerError:(state,action)=>{
        state.error = null; 
    },
    roughReducerMessages:(state,action)=>{
        state.message = null;
    }
});