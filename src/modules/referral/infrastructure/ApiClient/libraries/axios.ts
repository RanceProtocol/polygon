import axiosLibrary from "axios";
import { IApiClientWrapper } from "../../interfaces/apiClientWrapper";

export const axios: IApiClientWrapper = {
    get: (url: string, configs?: object): any => {
        axiosLibrary.get(url, configs);
    },
    post: (url: string, configs: object): any => {
        axiosLibrary.post(url, configs);
    },
};
