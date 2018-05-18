/**
 * Created by a297 on 18/2/8.
 */
/**
 * Created by a297 on 17/12/9.
 */
import Cookies from 'js-cookie';
import md5 from 'js-md5';
import { Modal } from 'antd';

export function checkLog(tokenName) {
  const signature = Cookies.get(tokenName);
  console.log('check' + tokenName, signature);
  return signature;
}
export function saveToken(tokenName, token, expire) {
  return Cookies.set(tokenName, token, { expires: expire });
}
export function removeToken(tokenName) {
  return Cookies.remove(tokenName);
}
export function logout(tokenName) {
  removeToken(tokenName);
  // message.info('已退出登录');
}
export function jumpToLogin() {
  Modal.error({
    title: '登录失效或未登录',
    content: '即将跳转登录界面...',
  });
  setTimeout(() => {
    window.location.href = '/#/login';
  }, 2000);
}

export function md5Cipher(data) {
  // console.log(md5(data));
  return md5(data);
}
