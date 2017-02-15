import { combineReducers } from 'redux';
import { CommentsReducer } from './comments-reducer';

export const rootReducer = combineReducers({
  comments: CommentsReducer
});

