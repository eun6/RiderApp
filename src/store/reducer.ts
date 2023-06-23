import {combineReducers} from 'redux';

import userSlice from '../slices/user';
import orderSlice from '../slices/orders';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  order: orderSlice.reducer,
});

//typeScript의 Type error 피하기 위해 작성함.
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
