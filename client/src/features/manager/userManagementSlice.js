import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import managerService from "./managerService"
export const getUsers = createAsyncThunk('manager/getUser', async (key = '',thunkAPI) => {
    try{
        const users = await managerService.getUsers(key)
        return users;
    }catch(error){
        return thunkAPI.rejectWithValue(error.response.data?.message)
    }
})

export const deleteUser = createAsyncThunk('manager/deleteUser', async (userId,thunkAPI) => {
    try{
        const res = await managerService.deleteUser(userId) 
        return {...res,userId};
    }catch(error){
        return thunkAPI.rejectWithValue(error.response.data?.message)
    }
})

const initialState = {
    userList: [],
    isLoading: false,
    error : '',
    isDelete: false
}
const manageSlice = createSlice({
    name: 'manager',
    initialState,
    reducers: {
        reset : (state)=>{
          state.error = '',
          state.isDelete = false;
        },
        searchUser: (state,action)=>{
            state.userList = state.userList.filter((user)=>{
               return user.name.includes(action.payload)
            })
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getUsers.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getUsers.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.userList = action.payload.users
        })
        .addCase(getUsers.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload
        })
        .addCase(deleteUser.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{
            state.userList = state.userList.filter((user)=>user._id !== action.payload.userId)
            state.isLoading = false;
            state.isDelete = true
        })
        .addCase(deleteUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload
        })
    },

})

export const {reset,searchUser} = manageSlice.actions
export default manageSlice.reducer