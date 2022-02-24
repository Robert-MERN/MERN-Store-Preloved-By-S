import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartPopup: "noneC",
    wishlistPopup: "noneW"
}

const allPopupSlice = createSlice({
    name: "popupMessage",
    initialState,
    reducers: {
        setCartPopup: (state, action) => {
            state.cartPopup = action.payload;
        },
        setWishlistPopup: (state, action) => {
            state.wishlistPopup = action.payload;
        }
    }
});

export const { setCartPopup } = allPopupSlice.actions;
export const { setWishlistPopup } = allPopupSlice.actions;
export const selectCartPopup = (state) => state.popupMessage.cartPopup; 
export const selectWishlistPopup = (state) => state.popupMessage.wishlistPopup;
export default allPopupSlice.reducer; 
