import {Axios, AxiosWithAuth} from '~~/utils/Axios';
// import {getProfile} from './profile';
// import {getBalances} from './wallet';
import Cookies from 'js-cookie';

//login
export const login = (data, store) => {
    Axios('post','/api/auth/userLogin',data)
    .then(res=>{
        Cookies.set('token', res.data.token );
        store.commit('handleGetUser',res.data.user);
        store.commit('handleLogin',true);
        store.commit('handleOnLogin', false);
        store.commit('handleNotification',{type:'Success',message:'Login Successed!'});
    })
    .catch(err=>{
        console.log(err)
        if(err.response)
            store.commit('handleNotification',{type:'Error',message:err.response.data});
        else
            store.commit('handleNotification',{type:'Error',message: "Network Connection Error."});
    });
}
//register
export const register = (data, store) => {
    Axios('post','/api/auth/userRegister',data)
    .then(res=>{
        Cookies.set('token', res.data.token );
        store.commit('handleGetUser',res.data.user);
        store.commit('handleLogin',true);
        store.commit('handleOnLogin', false);
        store.commit('handleNotification',{type:'Success',message:'Register Successed!'});
    })
    .catch(err=>{
        if(err.response)
            store.commit('handleNotification',{type:'Error',message:err.response.data});
        else
            store.commit('handleNotification',{type:'Error',message: "Network Connection Error."});
    });
}

export const sessionCheck = (store, router) => {
    AxiosWithAuth('post','/api/auth/sessionCheck',{}, store, router)
    .then(res=>{
        store.commit('handleGetUser',res.data);
        store.commit('handleLogin',true);
        store.commit('handleOnLogin', false);
    })
    .catch(err=>{
        console.log(err)
        if(err.response)
            store.commit('handleNotification',{type:'Error',message:err.response.data});
        else
            store.commit('handleNotification',{type:'Error',message: "Network Connection Error."});
    });
}


//logout
export const logout = (store, router) => {
    AxiosWithAuth('post','/api/auth/userLogout', {}, store, router)
    .then(res=>{
        Cookies.remove('token');
        store.commit('handleLogin',false);
        router.push("/");
        store.commit('handleNotification',{type:'Success',message:'Logout Successed!'});
    })
    .catch(err=>{
        if(err.response)
            store.commit('handleNotification',{type:'Error',message:err.response.data.message});
        else
            store.commit('handleNotification',{type:'Error',message: "Network Connection Error."});
    });
}