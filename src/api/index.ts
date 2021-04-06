import axios, {AxiosInstance, Method} from "axios";

const instance: AxiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_URI
});

export interface MakeRequestArgs {
	url: string;
	method: Method;
	params?: any;
	data?: any;
	headers?: any;
}

const makeRequest = (arg: MakeRequestArgs) => {
	return instance(
		arg.url, {
		method: arg.method,
		params: arg.params,
		data: arg.data,
		headers: arg.headers
	});
};

export default makeRequest;

/* WebSockets */

export interface SocketArgs {
	url: string,
	protocols?: string | string[]
}

export const socket = (args: SocketArgs): WebSocket => new WebSocket(process.env.REACT_APP_WS_URI + args.url, args.protocols);

/* Commin API interfaces */

export interface ApiPaginate<T> {
	count: number,
	next: any,
	previous: any,
	results: Array<T>
}

/* Re-export from modules */

export * from "./auth.api";
export * from "./accounts.api";
export * from "./chats.api";