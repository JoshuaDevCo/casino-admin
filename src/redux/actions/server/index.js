import Theme from "../../../Theme";
import { GET_SERVER_CONFIG } from "../../constants";

export const getServerConfig = () => {
    return dispatch => {
        Theme.request({
            endpoint : "server/getServerConfig",
            method : "GET",
            expectType : ""
        }, rdata => {
            try{
                rdata = Theme.CryptoJS.AES.decrypt(rdata, Theme.secretKey);
                rdata = rdata.toString(Theme.CryptoJS.enc.Utf8);
                rdata = JSON.parse(rdata);
                dispatch({
                    type : GET_SERVER_CONFIG,
                    payload : rdata
                })
            } catch(e) {
                console.log(e);
                dispatch({
                    type : GET_SERVER_CONFIG,
                    payload : {}
                })
            }
        })
    }
}