import axios from "axios";

import config from "../config/config";

const callApi = (method, reqURL, data = {}, headers) => {
    return new Promise((resolve, reject) => {
        let url = `${config.serverURL}/${reqURL}`;
        let option = {
            method,
            url,
            data,
            headers
        };
        console.log("option>>>>>>", option);
        if (option.method === "get") delete option[data];
        axios({ ...option })
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export default callApi;
