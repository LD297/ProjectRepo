/**
 * Created by a297 on 18/3/19.
 */
import request from '../utils/request';

export function genOrder(payload) {
  const promise = request('/api/orders/genOrder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return promise.then((v) => {
    console.log('======== venue gen order msg = ' + v.data.msg);
    return v.data;
  }) ;
}
export function genOrderLive(payload) {
  const promise = request('/api/orders/genOrderLive', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return promise.then((v) => {
    console.log('======== venue gen order live msg = ' + v.data.msg);
    return v.data;
  }) ;
}
export function genMemberOrderLive(payload) {
  const promise = request('/api/orders/genMemberOrderLive', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return promise.then((v) => {
    console.log('======== venue gen member order msg = ' + v.data.msg);
    return v.data;
  }) ;
}
export function fetchMyOrders() {
  const promise = request('/api/orders/myOrders', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  return promise.then((v) => {
    console.log('======== fetch my orders in service = ', v.data);
    return v.data;
  });
}
export function payNow(payload) {
  console.log("=========== pay now in services ===========");
  const promise = request('/api/orders/payNow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return promise.then((v) => {
    console.log('================== pay now msg in service = ' + v.data.msg + " , words = " + v.data.words);
    return v.data;
  });
}
export function cancelOrder(payload) {
  const promise = request('/api/orders/cancel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: payload,
  });
  return promise.then((v) => {
    console.log('================== cancel order msg in service = ' + v.data.msg + " , words = " + v.data.words);
    return v.data;
  });
}
export function refund(payload) {
  const promise = request('/api/orders/refund', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: payload,
  });
  return promise.then((v) => {
    console.log('================== refund msg in service = ' + v.data.msg + " , words = " + v.data.words);
    return v.data;
  });
}
