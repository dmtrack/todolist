// import axios from "axios";
// import configFile from "../src/app/config.json";
//
// axios.defaults.baseURL = configFile.apiEndpoint;
// axios.interceptors.request.use(
//   function (config) {
//     console.log(config);
//     config.url = config.url.slice(0, -1) + ".json";
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );
//
// axios.interceptors.response.use(
//   (res) => res,
//   function (error) {
//     return Promise.reject(error);
//   }
// );
//
// const httpService = {
//   get: http.get,
//   post: http.post,
//   put: http.put,
//   delete: http.delete,
//   patch: http.patch,
// };
// export default httpService;
