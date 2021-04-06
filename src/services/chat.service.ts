import {useEffect, useRef, useState} from "react";
import {ChatMessage, ChatSocketData, ChatSocketDataTypes, connectToChat} from "../api";
import {chatDialogAddMessagesAction, useTypedSelector, ChatDialogState} from "../redux";
import {useDispatch} from "react-redux";

/* Hooks */

export type useChatDialogReturnType = [WebSocket | null, ChatDialogState,];

export const useChatDialog = (id: number): useChatDialogReturnType => {
	const ws = useRef<WebSocket>(null);

	const store = useTypedSelector(store => store.chatdialog);
	const dispatch = useDispatch();

	useEffect(() => {
		const connection = connectToChat(id);
		connection.onopen = () => console.log("[useChat] Successfully opened connection.");
		connection.onerror = () => console.error("[useChat] Something went wrong with WebSocket.");
		connection.onclose = () => console.log("[useChat] Websocket connection has been closed.");
		connection.onmessage = (e) => {
			const data: ChatSocketData = JSON.parse(e.data);
			console.log("%cMessage: ", "color: orange", data.type);
			console.log("%cObject: ", "color: yellow", data);
			switch (data.type) {
				case ChatSocketDataTypes.history: {
					// history
					dispatch(chatDialogAddMessagesAction(data.messages));
					break;
				}
				case ChatSocketDataTypes.join: {
					// join
					break;
				}
				case ChatSocketDataTypes.leave: {
					// leave
					break;
				}
				case ChatSocketDataTypes.message: {
					// message
					dispatch(chatDialogAddMessagesAction([data.message]));
					break;
				}
			}
		};
	}, [ws.current]);

	return [ws.current, store];
};