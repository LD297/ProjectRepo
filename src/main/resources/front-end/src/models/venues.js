/**
 * Created by a297 on 18/3/9.
 */
import * as venuesService from '../services/venues';
import * as security from '../utils/security';

export default {

  namespace: 'venues',

  state: {
    loginRes: {
      cookie: '',
      msg: '',
      words: '',
    },
    applyRes: {
      msg: '',
      words: '',
    },
    myVenue: {},
    releaseRes: {
      msg: '',
      words: '',
    },
    myShows: [],
    myLiveTickets: [],
    memberInfo: {},
    checkTicketLiveRes:{
      msg: '',
      words: ''
    },
    venueStatistics: [],
    updateVenueInfoRes: {
      msg: '',
      words: '',
    },
    venueInfo: {},
  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
      return history.listen(({pathname, query}) => {
        if (pathname === '/myvenue' || pathname === "/release" || pathname === "/updatevenueinfo") {
          dispatch({
            type: 'fetchMyVenue',
            payload: '',
          });
        }
        else if (pathname === '/myshows') {
          dispatch({
            type: 'fetchMyShows',
            payload: '',
          });
        }
        else if (pathname === '/mylivetickets') {
          dispatch({
            type: 'fetchMyLiveTickets',
            payload: '',
          });
        }
        else if (pathname ==='/venuestatistics') {
          dispatch({
            type: 'fetchVenueStatistics',
            payload: '',
          });
        }
        else if (pathname === '/venueinfo') {
          dispatch({
            type: 'fetchVenueInfo',
            payload: '',
          });
        }
      });
    },
  },

  effects: {
    *login({ payload }, { call, put }) {
      console.log("======= venues login in model =======" + payload.id);
      const loginRes = yield call(venuesService.login, payload);
      yield put({
        type: 'saveLoginRes',
        payload: loginRes,
      });
    },
    *fetchMyVenue({ payload }, { call, put }) {
      console.log('===== fetch my venue ===');
      const myVenue = yield call(venuesService.fetchMyVenue);
      yield put({
        type: 'saveMyVenue',
        payload: myVenue,
      });
    },
    *apply({ payload }, { call, put }) {
      console.log('====== venues apply in model ======' + payload.stageName);
      const applyRes = yield call(venuesService.apply, payload);
      yield put({
        type: 'saveApplyRes',
        payload: applyRes,
      });
    },
    *release({ payload }, { call, put }) {
      console.log('===== venues release in model: ' + payload.description);
      const releaseRes = yield call(venuesService.release, payload);
      yield put({
        type: 'saveReleaseRes',
        payload: releaseRes,
      });
    },
    *fetchMyShows({ payload }, { call, put }) {
      console.log('venues fetch my shows in model: ');
      const myShows = yield call(venuesService.fetchMyShows);
      yield put({
        type: 'saveMyShows',
        payload: myShows,
      });
    },
    *fetchMyLiveTickets({ payload }, { call, put }) {
      const myLiveTickets = yield call(venuesService.fetchMyLiveTickets);
      yield put({
        type: 'saveMyLiveTickets',
        payload: myLiveTickets,
      });
    },
    *fetchMemberInfo({ payload }, { call, put }) {
      console.log('===== fetch memberInfo ===', payload);
      const memberInfo = yield call(venuesService.fetchMemberInfo, payload);
      yield put({
        type: 'saveMemberInfo',
        payload: memberInfo,
      });
    },
    *checkTicketsLive({ payload }, { call, put }) {
      const checkTicketsLiveRes = yield call(venuesService.checkTicketsLive, payload);
      yield put({
        type: 'saveCheckTicketsLiveRes',
        payload: checkTicketsLiveRes,
      });
    },
    *fetchVenueStatistics({ payload }, { call, put }) {
      const venueStatistics = yield call(venuesService.fetchVenueStatistics);
      yield put({
        type: 'saveVenueStatistics',
        payload: venueStatistics,
      });
    },
    *updateVenueInfo({ payload }, { call, put }) {
      const updateVenueInfoRes = yield call(venuesService.updateVenueInfo, payload);
      yield put ({
        type: 'saveUpdateVenueInfoRes',
        payload: updateVenueInfoRes
      });
    },
    *fetchVenueInfo({ payload }, { call, put }){
      const venueInfo = yield call(venuesService.fetchVenueInfo);
      yield put({
        type: 'saveVenueInfo',
        payload: venueInfo
      });
    }
  },

  reducers: {
    saveLoginRes(state, {payload: loginRes}) {
      console.log('=============== venues saving login Res: ', loginRes);
      if (loginRes.msg === 'success') {
        security.saveToken("venueToken", loginRes.token);
      }
      return {...state, loginRes: loginRes};
    },
    saveMyVenue(state, {payload: myVenue}) {
      console.log('============== venues saving my venue: ', myVenue);
      return {...state, myVenue: myVenue};
    },
    saveApplyRes(state, {payload: applyRes}) {
      console.log('============== venues saving apply res: ', applyRes);
      return {...state, applyRes: applyRes};
    },
    saveReleaseRes(state, {payload: releaseRes}) {
      console.log('============= venues saving release res: ', releaseRes);
      return {...state, releaseRes: releaseRes};
    },
    saveMyShows(state, {payload: myShows}) {
      console.log('============== venues saving my shows: ', myShows);
      return {...state, myShows: myShows};
    },
    saveMyLiveTickets(state, {payload: myLiveTickets}) {
      console.log('============== venues saving my LiveTickets: ', myLiveTickets);
      return {...state, myLiveTickets: myLiveTickets};
    },
    saveMemberInfo(state, {payload: memberInfo}) {
      console.log('============== venues saving memberInfo: ', memberInfo);
      return {...state, memberInfo: memberInfo};
    },
    saveCheckTicketsLiveRes(state, {payload: checkTicketsLiveRes}) {
      return {...state, checkTicketLiveRes: checkTicketsLiveRes};
    },
    saveVenueStatistics(state, {payload: venueStatistics}) {
      return {...state, venueStatistics: venueStatistics};
    },
    saveUpdateVenueInfoRes(state, {payload: updateVenueInfoRes}) {
      return {...state, updateVenueInfoRes: updateVenueInfoRes};
    },
    saveVenueInfo(state, { payload: venueInfo }) {
      return {...state, venueInfo: venueInfo};
    }
  }
};
