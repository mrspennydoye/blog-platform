import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '@/types';

interface PostState {
  selectedPost: Article | null;
  isEditing: boolean;
}

const initialState: PostState = {
  selectedPost: null,
  isEditing: false,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Article | null>) => {
      state.selectedPost = action.payload;
    },
    setEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
  },
});

export const { setSelectedPost, setEditing } = postSlice.actions;
export default postSlice.reducer;