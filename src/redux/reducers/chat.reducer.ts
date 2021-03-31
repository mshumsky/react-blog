import {Dispatch} from "redux";
import {Chat, requestChats} from "../../api";

/* Types */

export interface ChatState {
	list: Array<Chat>;
}

export enum ChatActionTypes {
	fetchChats = "CHAT_FETCHALL"
}

export interface ChatFetchAllAction {
	type: ChatActionTypes.fetchChats;
	payload: Array<Chat>;
}

export type ChatAction = ChatFetchAllAction;

/* Reducer */

const initState: ChatState = {
	list: []
};

export default (state = initState, action: ChatAction): ChatState => {
	switch (action.type) {
		case ChatActionTypes.fetchChats:
			return {
				...state,
				list: action.payload
			};
		default:
			return state;
	}
};

/* Action creator */

export const fetchAll = () =>
	async (dispatch: Dispatch<ChatFetchAllAction>) => {
		try {
			const resp = await requestChats();
			const chats = resp.data.results;
			dispatch({type: ChatActionTypes.fetchChats, payload: chats});
		} catch (err) {
			console.error("Failed in fetching chats.");
		}
	}