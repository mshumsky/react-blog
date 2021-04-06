import {AxiosResponse} from "axios";
import {getAuthorizationHeader, getAuthorizationToken} from "../services";

import makeRequest, {ApiPaginate, socket} from "./index";

export interface Chat {
	id: number,
	creator: string,
	created_at: string,
	participants: Array<number>;
}

export const requestChats = (page?: number): Promise<AxiosResponse<ApiPaginate<Chat>>> => makeRequest({
	url: "v1/chats/",
	method: "get",
	headers: getAuthorizationHeader()
});

export interface ChatMessage {
	sender: string;
	text: string;
	timestamp: string;
}

export enum ChatSocketDataTypes {
	message = "chat_message",
	history = "chat_history",
	leave = "chat_leave",
	join = "chat_join"
}

export interface ChatSocketDataMessage {
	type: ChatSocketDataTypes.message;
	message: ChatMessage;
	username: string;	
}

export interface ChatSocketDataHistory {
	type: ChatSocketDataTypes.history;
	messages: ChatMessage[];
	username: string;
}

export interface ChatSocketDataLeave {
	type: ChatSocketDataTypes.leave;
	username: string;
	connection_status: string;
}

export interface ChatSocketDataJoin {
	type: ChatSocketDataTypes.join;
	username: string;
	connection_status: string;
}

export type ChatSocketData = 
	ChatSocketDataMessage |
	ChatSocketDataHistory |
	ChatSocketDataLeave |
	ChatSocketDataJoin;

export const connectToChat = (id: number) => socket({url: `chat/${id}/`, protocols: ["Token", getAuthorizationToken()!]});