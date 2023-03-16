import {combineReducers} from 'redux';

import userSlice from '../slices/user';

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

//typeScript의 Type error 피하기 위해 작성함.
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
