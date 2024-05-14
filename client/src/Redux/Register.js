import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data:null,
};

const registerSlice = createSlice({
    name: "registerSlice",
    initialState: initialState,
    reducers: {
        handleData: (state, action) => {
            const { name, value } = action.payload;
            return {
                ...state,data: { ...state.data,[name]: value,},
            };
        },
    },
});

export const { handleData } = registerSlice.actions;
export default registerSlice.reducer;
