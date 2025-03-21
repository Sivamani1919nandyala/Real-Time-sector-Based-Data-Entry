import { createSlice } from '@reduxjs/toolkit'
export const loaderSlice = createSlice({
    name: 'loaders',
    initialState: {
      loading: false,
    },
    reducers:{
        setLoader: (state, action) =>{
            state.loading = action.payload;
        },
    }
})
export const { setLoader } = loaderSlice.actions; // ✅ Correct export
export default loaderSlice.reducer; // ✅ Export reducer correctly
