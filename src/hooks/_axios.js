import axios from "axios";

// ** Declare API Func
const API_URL = () => {
    if(process.env.NODE_ENV === "development"){
        return "http://192.168.104.83:10040/api";
    } else {
        return "https://api.ibluday.com/api";
    }
}

// ** Declare Custome Axios
const request = async ({endpoint, method, params}, cb) => {
    const property = {
        method: method,
        url: API_URL() + endpoint,
        data : params
    };
    try{
        const response = await axios(property);
        return response.data;
    } catch(e) {
        return e.toString();
    }
}
export default request;