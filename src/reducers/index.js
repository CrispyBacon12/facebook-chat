import { combineReducers } from 'redux';
import { CommentsReducer } from './comments-reducer';
import { ApprovedCommentsReducer } from './approved-comments-reducer';

export const rootReducer = combineReducers({
  comments: CommentsReducer,
  approvedComments: ApprovedCommentsReducer
});
