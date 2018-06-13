import { stringify } from 'qs';
import request from '../utils/request';

export async function getBindTerminal(params) {
  return request(`/api/v1/syt/bindTerminal/${params.openid}`);
}
export async function bindTerminal(params) {
  return request('/api/v1/syt/bindTerminal', {
    method: 'POST',
    body: params,
  });
}
export async function unBindTerminal(params) {
  return request(`/api/v1/syt/bindTerminal/${params.openid}`, {
    method: 'DELETE',
    body: params,
  });
}
export async function scan(params) {
  return request(`/api/v1/scan?${stringify(params)}`);
}
export async function login(params) {
  return request('/api/v1/syt/login', {
    method: 'POST',
    body: params,
  });
}
export async function logout(params) {
  return request('/api/v1/syt/logout', {
    method: 'POST',
    body: params,
  });
}
export async function getWorkOrderList(params) {
  return request(`/api/v1/faultorder?${stringify(params)}`);
  // return request(`/faultorder/${params.userid}`);
}
export async function getWorkOrderInfo(params) {
  return request(`/api/v1/faultorder?${stringify(params)}`);
}
export async function commitWorkOrder(params) {
  return request('/api/v1/faultorder', {
    method: 'POST',
    body: params,
  });
}
export async function uploadpic(params) {
  return request('/api/v1/faultorder/uploadpic', {
    method: 'POST',
    body: params,
  });
}
export async function getNumberBindList(params) {
  return request(`/api/v1/numberManager/numberBindList?${stringify(params)}`);
}
