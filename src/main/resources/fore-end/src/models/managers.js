/**
 * Created by a297 on 18/3/12.
 */
import * as managersService from '../services/managers';
import * as security from '../utils/security';

export default {

  namespace: 'managers',

  state: {
    loginRes: {
      cookie: '',
      msg: '',
      words: '',
    },
    applications: [],
    applicationExaminationRes: {
      msg: '',
      words: '',
    },
    balances: [],
    managerStatistics: {},
    modifications: [],
    modificationExaminationRes: {
      msg: '',
      words: ''
    },
  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
      return history.listen(({pathname, query}) => {
        if (pathname === '/applicationexam') {
          dispatch({
            type: 'fetchApplications',
            payload: '',
          });
        }
        else if (pathname === '/balance') {
          dispatch({
            type: 'fetchBalances',
            payload: '',
          });
        }
        else if (pathname === '/managerstatistics') {
          dispatch({
            type: 'fetchManagerStatistics',
            payload: '',
          });
        }
        else if (pathname === '/modificationexam') {
          dispatch({
            type: 'fetchModifications',
            payload: ''
          });
        }
      });
    },
  },

  effects: {
    // *fetch({ payload }, { call, put }) {  // eslint-disable-line
    //   yield put({ type: 'save' });
    // },
    *login({ payload }, { call, put }) {
      console.log("======= managers login in model =======" + payload.id);
      const loginRes = yield call(managersService.login, payload);
      yield put({
        type: 'saveLoginRes',
        payload: loginRes,
      });
    },
    *fetchApplications({ payload }, { call, put }) {
      console.log('fetch applications');
      const applications = yield call(managersService.fetchApplications);
      yield put({
        type: 'saveApplications',
        payload: applications,
      });
    },
    *applicationExamination({ payload }, { call, put }) {
      console.log('application examination in model');
      const applicationExaminationRes = yield call(managersService.applicationExamination, payload);
      yield put({
        type: 'saveApplicationExaminationRes',
        payload: applicationExaminationRes,
      });
    },
    *fetchBalances({ payload }, { call, put }) {
      const balances = yield call(managersService.fetchBalances);
      yield put({
        type: 'saveBalances',
        payload: balances,
      });
    },
    *balance({ payload }, { call, put }) {
      const balanceRes = yield call(managersService.balance, payload);
      yield put({
        type: 'saveBalanceRes',
        payload: balanceRes,
      });
    },
    *fetchManagerStatistics({ payload }, { call, put }) {
      const managerStatistics = yield call(managersService.fetchManagerStatistics);
      yield put({
        type: 'saveManagerStatistics',
        payload: managerStatistics,
      });
    },
    *fetchModifications({ payload }, { call, put }) {
      const modifications = yield call(managersService.fetchModifications);
      yield put({
        type: 'saveModifications',
        payload: modifications
      });
    },
    *modificationExamination({ payload }, { call, put }) {
      const modificationExaminationRes = yield call(managersService.modificationExamination, payload);
      yield put({
        type: 'saveModificationExaminationRes',
        payload: modificationExaminationRes
      });
    },
  },

  reducers: {
    // save(state, action) {
    //   return { ...state, ...action.payload };
    // },
    saveLoginRes(state, {payload: loginRes}) {
      console.log('=============== managers saving login Res: ', loginRes);
      if (loginRes.msg === 'success') {
        security.saveToken("managerToken", loginRes.token);
      }
      return {...state, loginRes: loginRes};
    },
    saveApplications(state, { payload: applications }) {
      console.log('============== managers saving applications: ', applications);
      return {...state, applications: applications};
    },
    saveApplicationExaminationRes(state, { payload: applicationExaminationRes }) {
      console.log('============== managers saving exam res: ', applicationExaminationRes);
      return {...state, applicationExaminationRes: applicationExaminationRes};
    },
    saveBalances(state, { payload: balances }) {
      console.log('============== managers saving balances: ', balances);
      return {...state, balances: balances};
    },
    saveBalanceRes(state, { payload: balanceRes }) {
      return {...state, balanceRes: balanceRes};
    },
    saveManagerStatistics(state, { payload: managerStatistics }) {
      return {...state, managerStatistics: managerStatistics};
    },
    saveModifications(state, { payload: modifications }) {
      console.log('save modifications: ', modifications)
      return {...state, modifications: modifications};
    },
    saveModificationExaminationRes(state, { payload: modificationExaminationRes }) {
      return {...state, modificationExaminationRes: modificationExaminationRes};
    }
  },

};
