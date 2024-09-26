import {AxiosWithAuth} from '~~/utils/Axios';

//login
export const changePassword = (currentPassword, newPassword, store, router) => {
    AxiosWithAuth('post','/api/user/changePassword', {currentPassword, newPassword}, store, router)
    .then(res=>{
        if(res.data.status == "500")
            store.commit('handleNotification',{type:'Error',message: res.data.msg});
        else{
            store.commit('handleNotification',{type:'Success',message:'Password Changed!'});
            store.commit('handleGetUser',res.data.user);
        }
    })
    .catch(err=>{
        if(err.response)
            store.commit('handleNotification',{type:'Error',message:err.response.data});
        else
            store.commit('handleNotification',{type:'Error',message: "Network Connection Error."});
    });
}
//register
export const changeEmail = (new_email, email_password, store, router) => {
    AxiosWithAuth('post','/api/user/changeEmail', {new_email, email_password}, store, router)
    .then(res=>{
        if(res.data.status == "500")
            store.commit('handleNotification',{type:'Error',message: res.data.msg});
        else{
            store.commit('handleNotification',{type:'Success',message:'Email Changed!'});
            store.commit('handleGetUser',res.data.user);
        }
    
    })
    .catch(err=>{
        if(err.response)
            store.commit('handleNotification',{type:'Error',message:err.response.data});
        else
            store.commit('handleNotification',{type:'Error',message: "Network Connection Error."});
    });
}

export const changeUsername = (new_username, store, router) => {
    AxiosWithAuth('post','/api/user/changeUsername',{new_username}, store, router)
    .then(res=>{
        if(res.data.status == "500")
            store.commit('handleNotification',{type:'Error',message: res.data.msg});
        else{
            store.commit('handleNotification',{type:'Success',message:'Username Changed!'});
            store.commit('handleGetUser',res.data.user);
        }
    
    })
    .catch(err=>{
        if(err.response)
            store.commit('handleNotification',{type:'Error',message:err.response.data});
        else
            store.commit('handleNotification',{type:'Error',message: "Network Connection Error."});
    });
}


//logout
export const changeAvatar = (store, router) => {
    AxiosWithAuth('post','/api/user/changeAvatar', {}, store, router)
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