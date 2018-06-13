export function getQueryStrFromUrl(str) {
  const urlString = String(window.document.location.href);
  const rs = new RegExp(`(^|)${str}=([^&]*)(&|$)`, 'gi').exec(urlString);
  const tmp = rs;
  if (tmp) {
    return tmp[2];
  }
  return null;
}
