import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./auth.service"


const initialState = {
    user: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
    isAuthenticated: false,
    role: '',
    isLoading: false,
    isError: false,
    isSuccess: false,
    error: {}
}
export const login = createAsyncThunk(
    "auth/login",
    async (credentials, thunkAPI) => {
        try {
            const data = await authService.login(credentials);
            return data;
        } catch (error) {
            const payload = {
                status: error.response.data?.status,
                message: error.response.data?.message
            }
            return thunkAPI.rejectWithValue(payload);
        }
    }
)
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("userInfo");
            state.isAuthenticated = false;
            state.user = null;
            state.role = '';  
        },
        reset: (state) => {
            console.log("reset")
            state.isLoading = false,
                state.isError = false,
                state.isSuccess = false,
                state.error = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                console.log(action.payload.role)
                state.role = action.payload.role
                state.isSuccess = true
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isError = true;
                state.error = action.payload
            })
    }
})

export const { reset, logout } = authSlice.actions
export default authSlice.reducer