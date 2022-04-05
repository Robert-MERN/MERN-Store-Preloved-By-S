import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    favorites: [],
}

const whishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        setFavorites: (state, action)=>{
            const sameStatePrevent = state.favorites.some((i)=> i._id === action.payload._id);
            if(!sameStatePrevent){
                state.favorites.unshift(action.payload);
            }
        },
        unSetFavorites: (state, action)=>{
            state.favorites.splice(state.favorites.findIndex((i)=> i._id === action.payload._id), 1);
        },
        removeFavorites: (state, action)=> {
            state.favorites = [];
        }
    }
});

export const { setFavorites } = whishlistSlice.actions;
export const { unSetFavorites } = whishlistSlice.actions;
export const { removeFavorites } = whishlistSlice.actions;
export const selectFavorites = (state) => state.wishlist.favorites;
export default whishlistSlice.reducer;