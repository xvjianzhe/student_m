import baseApi from "@/api/baseApi";
import store from "@/store";


export function AuthSendMailCode(mail: string){
    return baseApi.get(
        '/public/emailGetRegisterCode?email=' + mail,
    );
}

export class AuthBaseRegisterReq {
    email:string
    code:string

    constructor(email:string, code:string) {
        this.email = email;
        this.code = code;
    }
}

export function AuthByEmailCode(auth: AuthBaseRegisterReq) {

    return baseApi.post(
        '/auth/authByEmailCode',
        auth,
    ).then(r => {
        if (r.data) {
            store.commit("setLogin", r.data.token)
        }
        return r.data.token;
    });
}

export default {}