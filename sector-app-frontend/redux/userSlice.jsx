import { createSlice } from '@reduxjs/toolkit'
export const userSlice = createSlice({
    name: 'users',
    initialState: {
      user:null
    },
    reducers:{
        setUser: (state, action) =>{
            state.user = action.payload;
        },
    }
})
export const { setUser } = userSlice.actions; // ✅ Correct export
export default userSlice.reducer; // ✅ Export reducer correctly
