/**
 * Created by a297 on 18/3/18.
 */
import request from '../utils/request';

export function fetchShowDetails(payload) {
  const promise = request(`/api/shows/details?showId=${payload}`);
  return promise.then((v) => {
    console.log('show details in service: ', v.data);
    return v.data;
  });
}
export function fetchShowSeats(payload) {
  const promise = request(`/api/showSeats/selectSeatsInfo?showId=${payload}`);
  return promise.then((v) => {
    console.log('show seats in service: ', v.data);
    return v.data;
  });
}
export function fetchSortRes(payload) {
  const promise = request(`/api/shows/sortRes?showType=${payload}`);
  return promise.then((v) => {
    console.log('fetch sort res in services: ', v.data);
    return v.data;
  });
}
export function fetchShowsInHomepage() {
  const promise = request('/api/shows/showsInHomepage');
  return promise.then((v) => {
    console.log('fetch showsInHomepage in services: ', v.data);
    return v.data;
  });
}
