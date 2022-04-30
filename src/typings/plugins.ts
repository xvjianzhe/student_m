
import logger from "@/log/baselog";
import Api from "@/api/baseApi";

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $http: typeof Api
        $log: typeof logger
    }
}

export {}