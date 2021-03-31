import {AxiosResponse} from "axios";
import {getAuthorizationHeader} from "../services";

import makeRequest, {ApiPaginate} from "./index";

export interface Chat {
	id: number,
	creator: string,
	created_at: string,
	participants: Array<number>
}

export const requestChats = (page?: number): Promise<AxiosResponse<ApiPaginate<Chat>>> => makeRequest({
	url: "v1/chats/",
	method: "get",
	headers: getAuthorizationHeader()
});