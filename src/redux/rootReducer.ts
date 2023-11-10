import { combineReducers } from 'redux';
// Slices
import caseSlice from './slices/case';
import commentSlice from './slices/comment';

const rootReducer = combineReducers({
  case: caseSlice,
  comment: commentSlice,
});

export default rootReducer;
