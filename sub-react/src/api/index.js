import axios from 'axios'

axios.defaults.withCredentials = false;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头
//添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data && response.data.code) {
  }
  return response
}, function (err) {
  if(err && err.response){
      switch (err.response.status) {
        case 400: err.message = '请求错误(400)' ; break;
        case 401: err.message = '未授权，请重新登录(401)'; break;
        case 403: err.message = '拒绝访问(403)'; break;
        case 404: err.message = '请求出错(404)'; break;
        case 408: err.message = '请求超时(408)'; break;
        case 500: err.message = '服务器错误(500)'; break;
        case 501: err.message = '服务未实现(501)'; break;
        case 502: err.message = '网络错误(502)'; break;
        case 503: err.message = '服务不可用(503)'; break;
        case 504: err.message = '网络超时(504)'; break;
        case 505: err.message = 'HTTP版本不受支持(505)'; break;
        default: err.message = `连接出错(${err.response.status})!`;
      }
    }
    return Promise.reject(err);
});

//通用方法

export const POST = async (url, params) => {
  const res = await axios.post(`${url}`, params);
  return res.data
}

export const GET = async (url, params) => {
  const res = await axios.GET(`${url}`, params);
  return res.data
}

export const downLoad = (url, params) => {
  window.location.href = `${url}?${params}`;
}
