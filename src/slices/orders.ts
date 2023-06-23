import {PayloadAction, createSlice} from '@reduxjs/toolkit';

//타입 스크립트는 빈 배열을 싫어해 -> 인터페이스
//객체에 대한 타이핑을 할 때 인터페이스 사용.

//Order 들어온 데이터 형태랑 동일, 해당 데이터의 타입 명시.
//다른 곳에서도 쓸 인터페이스는 export 해둠.
export interface Order {
  orderId: string;
  start: {
    latitude: number;
    longitude: number;
  };
  end: {
    latitude: number;
    longitude: number;
  };
  price: number;
}

//initialState의 타이핑.
//orders 는 Order 데이터의 배열이 될 거야~ deliveries도.
interface InitialState {
  orders: Order[];
  deliveries: Order[];
}
const initialState: InitialState = {
  orders: [], //order 저장
  deliveries: [],
};
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },
    acceptOrder(state, action: PayloadAction<string>) {
      //orders 배열에서 id 맞는 값을 찾아 deliveries로 이동시키는 로직
      const index = state.orders.findIndex(v => v.orderId === action.payload);
      //index가 -1보다 크면 존재 -> 옮겨주고 기존 배열에서는 삭제
      if (index > -1) {
        state.deliveries.push(state.orders[index]);
        state.orders.splice(index, 1);
      }
    },
    rejectOrder(state, action) {
      const index = state.orders.findIndex(v => v.orderId === action.payload);
      if (index > -1) {
        state.orders.splice(index, -1);
      }
      const delivery = state.deliveries.findIndex(v => v.orderId === action.payload);
      if (delivery > -1) {
        state.deliveries.splice(delivery, -1);
      }
    },
},
  extraReducers: builder => {},
});

export default orderSlice;