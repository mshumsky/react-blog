import axios, {AxiosInstance, Method} from "axios";

const instance: AxiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_URI
});

export interface IMakeRequestArg {
	url: string;
	method: Method;
	params?: any;
	data?: any;
	headers?: any;
}

const makeRequest = (arg: IMakeRequestArg) => {
	return instance(
		arg.url, {
		method: arg.method,
		params: arg.params,
		data: arg.data,
		headers: arg.headers
	});
};

export default makeRequest;

/* Re-export from modules */

export * from "./auth.api";