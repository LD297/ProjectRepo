/**
 * Created by a297 on 18/2/3.
 */
import request from '../utils/request';

export function register(payload) {
  console.log('========= register in services =========' + payload.email);
  const promise = request('/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  // const promise = request('/api/users/test');
  return promise.then((v) => {
    console.log('================== msg = ' + v.data.msg + " , words = " + v.data.words);
    return v.data;
  });
}

export function login(payload) {
  console.log("=========== login in services ===========");
  const promise = request('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return promise.then((v) => {
    console.log('================== msg = ' + v.data.msg + " , words = " + v.data.words);
    return v.data;
  });
}

export function fetchMyInfo() {
  const promise = request('/api/users/myInfo', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  return promise.then((v) => {
    console.log('======== fetch my info in service = ', v.data);
    return v.data;
  });
}

export function exchangeCoupon(payload) {
  console.log("=========== exchange coupon in services ===========");
  const promise = request('/api/users/exchangeCoupon', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: payload,
  });
  return promise.then((v) => {
    console.log('================exchange coupon in service msg = ' + v.data.msg + " , words = " + v.data.words);
    return v.data;
  });
}

export function changeName(payload) {
  const promise = request('/api/users/changeName', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: payload,
  });
  return promise.then((v) => {return v.data});
}

export function cancelEmail() {
  const promise = request('/api/users/cancelEmail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  return promise.then((v) => {return v.data});
}

export function fetchMyStatistics() {
  const promise = request('/api/users/myStatistics', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  return promise.then((v) => {
    console.log('======== fetch my statistics in service = ', v.data);
    return v.data;
  });
}
