import { axiosClient } from './axiosClient';

const AuthAPI = {
    signup(data){
        const url = `/signup`;
        return axiosClient.post(url);
    },
    signin(data){
        const url =`/signin`;
        return axiosClient.post(url);
    },
    signout(){
        const url =`/signout`;
        return axiosClient.get(url);
    }
}