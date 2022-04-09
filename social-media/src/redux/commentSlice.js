import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments: [],
};

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        setComments: (state, action) => {
            state.comments.push(action.payload);
        },
    },
})

export const selectComment = state => state.comment.comments;
export const { setComments } = commentSlice.actions;
export default commentSlice.reducer;