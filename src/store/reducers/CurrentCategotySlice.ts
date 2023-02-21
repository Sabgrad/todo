import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface CurrentCategory {
    currentCategory: string;
}

const initialState: CurrentCategory = {
    currentCategory: "All"
}

export const currentCategorySlice = createSlice({
    name: 'currentCategoty',
    initialState,
    reducers: {
        changeCurrentCategory(state, action: PayloadAction<string>) {
            state.currentCategory = action.payload;
        }
    }
})

export default currentCategorySlice.reducer;