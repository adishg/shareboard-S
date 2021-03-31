import Axios, { AxiosRequestConfig } from 'axios';

export interface Credentials {
    username: string,
    password: string
}

interface LoginApiResponse {
    created: string,
    id: string,
    token: string,
    username: string
}

export const onLogin = async (data: Credentials) => {
    const requestConfig: AxiosRequestConfig = {
        method: 'post',
        url: process.env.REACT_APP_BACKEND_V2_POST_URL+'login',
        data  
    }
    try{
        const {data: {token}} = await Axios.request(requestConfig);
        //store token
        storeToken(token);
        return {
            token
        }
    }catch(e){
        console.error(e);
        return {error: e.response.data.message}
    }
}

export const BOUNCE_IT_TOKEN_KEY = 'bounce_it_token_key'

const storeToken = (token: string) => {
    localStorage.setItem(BOUNCE_IT_TOKEN_KEY, token);
}