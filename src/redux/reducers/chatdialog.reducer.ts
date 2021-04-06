import {Dispatch} from "redux";
import {Chat, ChatMessage, requestChats} from "../../api";

/* Types */

export interface ChatDialogState {
	messages: ChatMessage[];
}

export enum ChatDialogActionTypes {
	addMessages = "CHAT_MESSAGES",
}

export interface ChatDialogAddMessagesAction {
	type: ChatDialogActionTypes.addMessages;
	payload: ChatMessage[];
}


export type ChatDialogAction = ChatDialogAddMessagesAction;

/* Reducer */

const initState: ChatDialogState = {
	messages: []
};

export default (state = initState, action: ChatDialogAction): ChatDialogState => {
	switch (action.type) {
		case ChatDialogActionTypes.addMessages: 
			return {...state, messages: [...state.messages, ...action.payload]}
		default:
			return state;
	}
};

/* Action creator */

export const addMessages = (messages: ChatMessage[]) => 
	async (dispatch: Dispatch<ChatDialogAddMessagesAction>) => 
		dispatch({type: ChatDialogActionTypes.addMessages, payload: messages});