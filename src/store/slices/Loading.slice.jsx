import { createSlice } from '@reduxjs/toolkit';

export const loadinSlice = createSlice({
    name: 'loading',
    initialState: false,
    reducers: {
        setLoading:(state, action)=>{
            const loading= action.payload
            return loading
        }
    }
})

export const {setLoading  } = loadinSlice.actions;

export default loadinSlice.reducer;
