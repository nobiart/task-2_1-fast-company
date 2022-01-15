import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../config.json';

axios.defaults.baseURL = config.apiEndpoint;

axios.interceptors.response.use(
    (response) => response,
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500;
        if (!expectedErrors) {
            console.log(error);
            toast.error('Something went wrong');
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export default httpService;
