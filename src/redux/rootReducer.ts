import { combineReducers } from 'redux';
// Slices
import userSlice from './slices/user';
import caseSlice from './slices/case';
import commentSlice from './slices/comment';

const rootReducer = combineReducers({
  user: userSlice,
  case: caseSlice,
  comment: commentSlice,
});

export default rootReducer;
