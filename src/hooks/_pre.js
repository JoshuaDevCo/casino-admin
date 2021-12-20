import jwt_decode from "jwt-decode";
import Axios from "./_axios";

export const sessionCheck = async () => {
    const data = await new Promise(async resolve => {
        const token = sessionStorage.getItem("token");
        try{
            const user = jwt_decode(token);
            const session = await Axios({
                endpoint : "/auth/sessionCheck",
                method : "POST",
                params : user.auth_data
            });
            if(session.data){
                sessionStorage.setItem("token", session.token);
                resolve({
                    auth : {
                        isSession : true,
                        session : session.data
                    }
                })
            } else {
                resolve({
                    auth : {
                        isSession : false,
                        session : {}
                    }
                })
            }
        } catch (e) {
            resolve({
                auth : {
                    isSession : false,
                    session : {}
                }
            })
        }
    });
    return data;
}