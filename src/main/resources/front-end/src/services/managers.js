/**
 * Created by a297 on 18/3/12.
 */
import request from '../utils/request';

export function login(payload) {
  console.log("========== manager login in service ===========" + payload.id);
  const promise = request('/api/managers/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return promise.then((v) => {
    console.log('======== manager login msg = ' + v.data.msg);
    return v.data;
  }) ;
}
export function fetchApplications() {
  const promise = request('/api/managers/applications', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  return promise.then((v) => {
    console.log('=========== fetch applications in service', v.data);
    return v.data;
  });
}
export function applicationExamination(payload) {
  console.log('======== manager application exam in service ======', payload.operation);
  const promise = request('/api/managers/applicationExamination', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return promise.then((v) => {
    console.log('======== manager application exam msg = ', v.data.msg);
    return v.data;
  }) ;
}
export function fetchBalances() {
  const promise = request('/api/shows/balances', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  return promise.then((v) => {
    console.log('=========== fetch balances in service', v.data);
    return v.data;
  });
}
export function balance(payload) {
  const promise = request('/api/managers/balance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return promise.then((v) => {
    console.log('======== manager balance msg = ', v.data.msg);
    return v.data;
  }) ;
}
export function fetchManagerStatistics() {
  const promise = request('/api/managers/managerStatistics', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  return promise.then((v) => {
    console.log('======== venue fetch manager Statistics live msg = ' + v.data.msg);
    return v.data;
  }) ;
}
export function fetchModifications() {
  const promise = request('/api/managers/modifications', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  return promise.then((v) => {
    console.log('=========== fetch modifications in service', v.data);
    return v.data;
  });
}
export function modificationExamination(payload) {
  const promise = request('/api/managers/modificationExamination', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return promise.then((v) => {
    return v.data;
  }) ;
}
