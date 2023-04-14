import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import type { PayloadAction } from "@reduxjs/toolkit";

// type Initial State
type initialState = {
  value: string,
  loginStatus: number
  
};

const initialState: initialState = {
  value: "",
  loginStatus: 404,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginStatus:(state,{payload}:PayloadAction<number>)=>{
      state.loginStatus= payload
    },
    setUser: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    }
  },
});

// named import
export const {setUser,setLoginStatus}= userSlice.actions
export const selector= (state:RootState)=> state.user.value
export const selectorStatus = (state:RootState) => state.user.loginStatus
// default import
export default userSlice.reducer
