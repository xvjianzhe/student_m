import baseApi from "@/api/baseApi";
import logger from "@/log/baselog";


export class SysDictType {

}

export function GetDictType() {
    return baseApi.get(
        '/sys/getDictType'
    ).then(r => {
        if (r.data) {
            logger.info(r.data)
        }
        return r.data;
    });
}