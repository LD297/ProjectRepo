/**
 * Created by a297 on 18/3/9.
 */
import request from '../utils/request';

export function login(payload) {
  const promise = request('/api/venues/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return promise.then((v) => {
    console.log('======== venue login msg = ' + v.data.msg);
    return v.data;
  }) ;
}
export function fetchMyVenue() {
  const promise = request('/api/venues/myVenue', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  return promise.then((v) => {
    console.log('======== fetch my venue in service = ', v.data);
    return v.data;
  });
}
export function apply(payload) {
  const promise = request('/api/venues/apply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return promise.then((v) => {
    console.log('======== venue apply msg = ' + v.data.msg);
    return v.data;
  }) ;
}
export function release(payload) {
  const promise = request('/api/venues/release', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return promise.then((v) => {
    console.log('======== venue release msg = ' + v.data.msg);
    return v.data;
  }) ;
}
export function fetchMyShows() {
  const promise = request('/api/venues/myShows', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  return promise.then((v) => {
    console.log('======== fetch my shows in service = ', v.data);
    return v.data;
  });
}
export function fetchMyLiveTickets() {
  const promise = request('/api/orders/myLiveTickets', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  return promise.then((v) => {
    console.log('======== fetch my live tickets in service = ', v.data);
    return v.data;
  });
}
export function fetchMemberInfo(payload) {
  const promise = request(`/api/venues/memberInfo?email=${payload}`);
  return promise.then((v) => {
    console.log('======== fetch member info in service = ', v.data);
    return v.data;
  });
}
export function checkTicketsLive(payload) {
  const promise = request('/api/venues/checkTicketsLive', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return promise.then((v) => {
    console.log('======== venue check tickets live msg = ' + v.data.msg);
    return v.data;
  }) ;
}
export function fetchVenueStatistics() {
  const promise = request('/api/venues/venueStatistics', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  return promise.then((v) => {
    console.log('======== venue fetch venue Statistics msg = ' + v.data.msg);
    return v.data;
  }) ;
}
export function updateVenueInfo(payload) {
  const promise = request('/api/venues/updateVenueInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return promise.then((v) => {
    console.log('======== update venueinfo msg in service = ' + v.data.msg);
    return v.data;
  }) ;
}
export function fetchVenueInfo() {
  const promise = request('/api/venues/venueInfo', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  return promise.then((v) => {
    return v.data;
  }) ;
}
