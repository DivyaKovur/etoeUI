"use client"
import axios from "axios";


const BASE_URL = 'http://localhost:2023/'

if (typeof window !== 'undefined') {
    // Add a request interceptor
    axios.interceptors.request.use(function (req) {
        debugger;
        // Do something before request is sent
        req.headers.Authorization = sessionStorage?.token
        return req;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    });
}

export class Ajax {
    static sendGetReq(url) {
        return axios.get(BASE_URL + url);
    }
    static sendPostReq(url, data) {
        return axios.post(BASE_URL + url, data);
    }
    static sendPutReq(url, data) {
        return axios.put(BASE_URL + url, data);
    }
    static sendDeleteReq(url, data) {
        return axios.delete(BASE_URL + url, data)
    }
}