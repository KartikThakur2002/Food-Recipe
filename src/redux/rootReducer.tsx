import {combineReducers} from 'redux';
import favReducer from './slices/FavSlice';

const rootReducer = combineReducers({
  fav: favReducer,
});

export default rootReducer;
