import baseApi from "@/api/baseApi";


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
    )
}

export default {}