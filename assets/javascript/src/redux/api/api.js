import axios from 'axios';

const Api = { }
Api.RegisterApi = (user) => {
    return axios.post(`http://127.0.0.1:8000/rest-auth/registration/`, user)
}
Api.LoginApi = (loginuser) => {
    return axios.post(`http://127.0.0.1:8000/rest-auth/login/`, loginuser)
}
Api.StartApi=(data,token)=>{
    return axios({
        method:'POST',
        url:'http://127.0.0.1:8000/campaign/start/',
        data:{
            title:data.title,
            from_address:data.from_address
        },
        headers:{
            "Authorization":  `Bearer ${token}`,
        }

    })
    
}

export default Api;