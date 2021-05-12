let baseURL = 'http://localhost:3000';
if(location.origin.indexOf('https://.....') > -1){ //上线接口域名
  baseURL = 'https://.....';
}


export const E = {
    baseURL,
    // baseURL:'http://localhost:3001' //后端本地联调地址
}
export default E