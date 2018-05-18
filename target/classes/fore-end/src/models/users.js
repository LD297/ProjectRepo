/**
 * Created by a297 on 18/2/3.
 */
import * as usersService from '../services/users';
import * as security from '../utils/security';

export default {

  namespace: 'users',

  state: {
    registrationRes: {
      msg: '',
      words: '',
    },
    loginRes: {
      cookie: '',
      msg: '',
      words: '',
    },
    myInfo: {
      discount: 1.00,
    },
    exchangeCouponRes: {
      msg: '',
      words: '',
    },
    changeNameRes: {
      msg: '',
      words: '',
    },
    cancelEmailRes: {
      msg: '',
      words: '',
    },
    myStatistics: {},
  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
      return history.listen(({pathname, query}) => {
        if (pathname === "/myinfo" || pathname === "/buy") {
          dispatch ({
            type: 'fetchMyInfo',
            payload: '',
          });
        }
        else if (pathname === "/mystatistics") {
          dispatch ({
            type: 'fetchMyStatistics',
            payload: '',
          });
        }
      });
    },
  },

  effects: {
    *register({ payload }, { call, put }) {
      console.log("======= register in model =======");
      const registrationRes = yield call(usersService.register, payload);
      yield put({
        type: 'saveRegistrationRes',
        payload: registrationRes,
      });
    },
    *login({ payload }, { call, put }) {
        console.log("====== login in model =========");
        const loginRes = yield call(usersService.login, payload);
        yield put({
          type: 'saveLoginRes',
          payload: loginRes,
      });
    },
    *fetchMyInfo({ payload }, { call, put }) {
      const myInfo = yield call(usersService.fetchMyInfo);
      yield put({
        type: 'saveMyInfo',
        payload: myInfo,
      });
    },
    *exchangeCoupon({ payload }, { call, put }) {
      const exchangeCouponRes = yield call(usersService.exchangeCoupon, payload);
      yield put({
        type: 'saveExchangeCouponRes',
        payload: exchangeCouponRes,
      });
    },
    *changeName({ payload }, { call, put }) {
      const changeNameRes = yield call(usersService.changeName, payload);
      yield put({
        type: 'saveChangeNameRes',
        payload: changeNameRes,
      });
    },
    *cancelEmail({ payload }, { call, put }) {
      const cancelEmailRes = yield call(usersService.cancelEmail);
      yield put({
        type: 'saveCancelEmailRes',
        payload: cancelEmailRes,
      });
    },
    *fetchMyStatistics({ payload }, { call, put }) {
      const myStatistics = yield call(usersService.fetchMyStatistics);
      yield put({
        type: 'saveMyStatistics',
        payload: myStatistics,
      });
    },
  },

  reducers: {
    saveRegistrationRes(state, { payload: registrationRes }) {
      console.log('==================== saving register Res', registrationRes);
      return {...state, registrationRes: registrationRes};
    },
    saveLoginRes(state, { payload: loginRes }) {
      console.log('=================== saving login Res', loginRes);
      security.saveToken("userToken", loginRes.token);
      return {...state, loginRes: loginRes};
    },
    saveMyInfo(state, { payload: myInfo }) {
      return {...state, myInfo: myInfo};
    },
    saveExchangeCouponRes(state, { payload: exchangeCouponRes }) {
      return {...state, exchangeCouponRes: exchangeCouponRes};
    },
    saveChangeNameRes(state, { payload: changeNameRes }) {
      return {...state, changeNameRes: changeNameRes};
    },
    saveCancelEmailRes(state, { payload: cancelEmailRes }) {
      return {...state, cancelEmailRes: cancelEmailRes};
    },
    saveMyStatistics(state, { payload: myStatistics }) {
      return {...state, myStatistics: myStatistics};
    }
  },

};
