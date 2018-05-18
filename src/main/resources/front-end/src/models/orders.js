/**
 * Created by a297 on 18/3/18.
 */
import * as ordersService from '../services/orders';

export default {

  namespace: 'orders',

  state: {
    genOrderRes: {
      msg: '',
      words: '',
    },
    genMemberOrderLiveRes: {
      msg: '',
      words: '',
    },
    myOrders: [],
    payNowRes: {
      msg: '',
      words: '',
    },
    cancelOrderRes: {
      msg: '',
      words: '',
    },
    refundRes: {
      msg: '',
      words: '',
    },
    genOrderLiveRes: {
      msg: '',
      words: '',
    },
  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
      return history.listen(({pathname, query}) => {
        if (pathname === '/myorders') {
          console.log(' pathname == /myorders');
          dispatch({
            type: 'fetchMyOrders',
            payload: '',
          });
        }
      });
    },
  },

  effects: {
    *genOrder({ payload }, { call, put }) {
      const genOrderRes = yield call(ordersService.genOrder, payload);
      yield put({
        type: 'saveGenOrderRes',
        payload: genOrderRes
      });
    },
    *genOrderLive({ payload }, { call, put }) {
      const genOrderLiveRes = yield call(ordersService.genOrderLive, payload);
      yield put({
        type: 'saveGenOrderLiveRes',
        payload: genOrderLiveRes
      });
    },
    *genMemberOrderLive({ payload }, { call, put }) {
      const genMemberOrderLiveRes = yield call(ordersService.genMemberOrderLive, payload);
      yield put({
        type: 'saveGenMemberOrderLiveRes',
        payload: genMemberOrderLiveRes
      });
    },
    *fetchMyOrders({ payload }, { call, put }) {
      const myOrders = yield call(ordersService.fetchMyOrders);
      yield put({
        type: 'saveMyOrders',
        payload: myOrders
      });
    },
    *payNow({ payload }, { call, put }) {
      const payNowRes = yield call(ordersService.payNow, payload);
      yield put({
        type: 'savePayNowRes',
        payload: payNowRes
      });
    },
    *cancelOrder({ payload }, { call, put }) {
      const cancelOrderRes = yield call(ordersService.cancelOrder, payload);
      yield put({
        type: 'saveCancelOrderRes',
        payload: cancelOrderRes,
      });
    },
    *refund({ payload }, { call, put }) {
      const refundRes = yield call(ordersService.refund, payload);
      yield put({
        type: 'saveRefundRes',
        payload: refundRes,
      });
    },
  },

  reducers: {
    saveGenOrderRes(state, {payload: genOrderRes}){
      console.log('saving genOrderRes ', genOrderRes);
      return {...state, genOrderRes: genOrderRes};
    },
    saveGenOrderLiveRes(state, {payload: genOrderLiveRes}) {
      return {...state, genOrderLiveRes: genOrderLiveRes};
    },
    saveGenMemberOrderLiveRes(state, {payload: genMemberOrderLiveRes}){
      console.log('saving genMemberOrderLiveRes ', genMemberOrderLiveRes);
      return {...state, genMemberOrderLiveRes: genMemberOrderLiveRes};
    },
    saveMyOrders(state, {payload: myOrders}){
      console.log('saving my orders in model ', myOrders);
      return {...state, myOrders: myOrders};
    },
    savePayNowRes(state, {payload: payNowRes}){
      console.log('saving pay now res', payNowRes);
      return {...state, payNowRes: payNowRes};
    },
    saveCancelOrderRes(state, {payload: cancelOrderRes}){
      console.log('saving cancelOrderRes', cancelOrderRes);
      return {...state, cancelOrderRes: cancelOrderRes};
    },
    saveRefundRes(state, {payload: refundRes}) {
      return {...state, refundRes: refundRes};
    }
  },

};
