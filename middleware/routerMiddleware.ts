import Cookies from 'js-cookie';
export default defineNuxtRouteMiddleware((to, from) => {

    //catch click_id and promo when user call website
    const click_id = from.query.click_id;
    const promo = from.query.promo;
    if(click_id)                                                        //if url contains click_id, save it in cookie
        Cookies.set('click_id', click_id.toString());
    else                                                                //else remove origin click_id from cookie
        Cookies.remove('click_id');
    if(promo)                                                           //if url contains promo, save it in cookie
        Cookies.set('promo', promo.toString());  
    else                                                                //else remove origin promo from cookie
        Cookies.remove('promo');   
});
