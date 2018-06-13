import { stringify } from 'qs';
import request from '../utils/request';

export async function getSmsAuthCode(params) {
  return request('/api/v1/sms/getSmsAuthCode', {
    method: 'POST',
    body: params,
  });
}
export async function verifiSmsAuthCode(params) {
  return request('/api/v1/sms/verifiSmsAuthCode', {
    method: 'POST',
    body: params,
  });
}
export async function getAuthorizeURLFroWebsite(params) {
  return request(`/api/v1/wx/getAuthorizeURLForWebsite?${stringify(params)}`);
}
export async function getUserInfo(params) {
  // return request(`/api/v1/wx/userInfo/code?${stringify(params)}`);
  return request(`/api/v1/wx/userInfo/code/${params.code}`);
}
