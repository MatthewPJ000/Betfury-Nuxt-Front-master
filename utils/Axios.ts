import axios from 'axios';
export const baseURL = "http://localhost:2000";
import Cookies from 'js-cookie'

export const AxiosWithAuth = (meth :string, suburl:string, data?: object, store?: any, router?: any) => {
    const instance = axios.create();
    instance.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error){
            if(error.response.status === 401) {
                Cookies.remove("token");
                store.commit('handleLogin', false);
                router?.push("/");
            }
            return Promise.reject(error);
        }
    );
    return instance({
        method: meth,
        url: `${baseURL+suburl}`,
        headers: {"authorization" : Cookies.get('token')},
        data: data
    });
}
export const Axios = (meth :string, suburl:string, data?: object) => {
    return axios({
        method: meth,
        url: `${baseURL+suburl}`,
        data: data
    });
}