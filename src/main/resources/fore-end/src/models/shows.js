/**
 * Created by a297 on 18/3/18.
 */
import * as showsService from '../services/shows';

export default {

  namespace: 'shows',

  state: {
    showDetails: {},
    prices: '',
    showSeats: [],
    sortRes: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({pathname, query}) => {
        if (pathname === '/homepage') {
          dispatch({
            type: 'fetchShowsInHomepage',
            payload: '',
          });
        }
        else if (pathname === '/classification/vocalConcert') {
          dispatch({
            type: 'fetchSortRes',
            payload: 'vocalConcert',
          });
        }
        else if (pathname === '/classification/concert') {
          dispatch({
            type: 'fetchSortRes',
            payload: 'concert',
          });
        }
        else if (pathname === '/classification/opera') {
          dispatch({
            type: 'fetchSortRes',
            payload: 'opera',
          });
        }
        else if (pathname === '/classification/drama') {
          dispatch({
            type: 'fetchSortRes',
            payload: 'drama',
          });
        }
        else if (pathname === '/classification/dance') {
          dispatch({
            type: 'fetchSortRes',
            payload: 'dance',
          });
        }
        else if (pathname === '/classification/children') {
          dispatch({
            type: 'fetchSortRes',
            payload: 'children',
          });
        }
        else if (pathname === '/classification/comic') {
          dispatch({
            type: 'fetchSortRes',
            payload: 'comic',
          });
        }
      });
    },
  },

  effects: {
    *fetchShowDetails({ payload }, { call, put }) {  // eslint-disable-line
      const showDetails = yield call(showsService.fetchShowDetails, payload);
      yield put({
        type: 'saveShowDetails',
        payload: showDetails,
      });
    },
    *fetchShowSeats({ payload }, { call, put }) {
      console.log("fetch show seats in model: ", payload);
      const showSeats = yield call(showsService.fetchShowSeats, payload);
      yield put({
        type: 'saveShowSeats',
        payload: showSeats,
      });
    },
    *deliverShowDetails({ payload }, { put }) {
      yield put({
        type: 'saveShowDetails',
        payload: payload,
      });
    },
    *deliverPrices({ payload }, { put }) {
      console.log("deliver prices in model: " + payload);
      yield put({
        type: 'savePrices',
        payload: payload
      });
    },
    *fetchSortRes({ payload }, { call, put }) {
      console.log('fetch sort res: ', payload);
      const sortRes = yield call(showsService.fetchSortRes, payload);
      yield put({
        type: 'saveSortRes',
        payload: sortRes
      });
    },
    *fetchShowsInHomepage({ payload }, { call, put }) {
      console.log('fetch shows in homepage in model');
      const showsInHomepage = yield call(showsService.fetchShowsInHomepage);
      yield put({
        type: 'saveShowsInHomepage',
        payload: showsInHomepage
      });
    }
  },

  reducers: {
    saveShowDetails(state, {payload: showDetails}){
      console.log('shows saving show details: ', showDetails);
      return {...state, showDetails: showDetails};
    },
    saveShowSeats(state, {payload: showSeats}) {
      console.log('saving show seats in model', showSeats);
      return {...state, showSeats: showSeats};
    },
    savePrices(state, {payload}) {
      console.log('saving prices', payload);
      return {...state, prices: payload};
    },
    saveSortRes(state, {payload: sortRes}) {
      console.log('saving sort res: ', sortRes);
      return {...state, sortRes: sortRes};
    },
    saveShowsInHomepage(state, {payload: showsInHomepage}) {
      console.log('saving shows in homepage', showsInHomepage);
      return {...state, showsInHomepage: showsInHomepage};
    }
  }
};
