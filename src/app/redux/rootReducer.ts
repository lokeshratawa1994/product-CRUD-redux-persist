import { combineReducers } from 'redux';
import productSlice from './productSlice';

// import slices
// import mainSliceReducer from './slices/mainSlice';

const rootReducer = combineReducers({
    product:productSlice
});

export default rootReducer;