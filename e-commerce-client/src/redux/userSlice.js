import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: "idle",
    users: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoading: (state, action)=>{
      if(state.isLoading === "idle"){
        state.isLoading = "pending";
      };
    },
    userReceived: (state, action)=> {
      if(state.isLoading === "pending"){
        state.isLoading = "idle";
        state.users = action.payload;
      }
    },
    userError: (state, action)=>{
      if(state.isLoading === "pending"){
        state.isLoading = "idle";
      }
    },
    userLogout: (state)=>{
      state.users = null;
    }
    
  }
})

export const { userLoading } = userSlice.actions;
export const { userReceived } = userSlice.actions;
export const { userError } = userSlice.actions;
export const { userLogout } = userSlice.actions;
export const selectUser = (state)=> state.user.users;
export const selectIsLoading = (state)=> state.user.isLoading;
export default userSlice.reducer;

