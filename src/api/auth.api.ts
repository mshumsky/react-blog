import {AxiosResponse} from "axios";
import makeRequest from "./index";

export interface RequestRegisterCodeResponse {
	phone_number: string;
	pk: number;
}

export const requestRegisterCode = (phone_number: string): Promise<AxiosResponse<RequestRegisterCodeResponse>> => makeRequest({
	url: "v1/phone_login/generate/",
	method: "post",
	headers: {"Content-Type": "application/json"},
	data: {phone_number}
});

export interface validateRegisterCodeResponse {
	id: number;
	last_login: any;
	status: number;
	token: string;
}

export const validateRegisterCode = (pk: number, otp: string): Promise<AxiosResponse<validateRegisterCodeResponse>> => makeRequest({
	url: "v1/phone_login/validate/",
	method: "post",
	headers: {"Content-Type": "application/json"},
	data: {pk, otp}
});