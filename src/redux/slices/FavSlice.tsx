import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RecipeTypes} from '../../typings/indext';

type FavState = RecipeTypes[];

const initialState: FavState = [];

const favSlice = createSlice({
  name: 'fav',
  initialState,
  reducers: {
    addToFav: (state, action: PayloadAction<RecipeTypes>) => {
      const existingItem = state.find(
        item => item.idMeal === action.payload.idMeal,
      );
      if (!existingItem) {
        state.push(action.payload);
      }
    },
    removeFromFav: (state, action: PayloadAction<string>) => {
      return state.filter(item => item.idMeal !== action.payload);
    },
  },
});

export const {addToFav, removeFromFav} = favSlice.actions;
export default favSlice.reducer;
