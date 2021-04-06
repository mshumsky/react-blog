import React from "react";
import {useParams} from "react-router-dom";
import {useChatDialog} from "../services";


interface ChatDialogRouterParams {
	id: any;
}

const ChatDialog: React.FC = () => {
	const chatId = useParams<ChatDialogRouterParams>().id;
	const [ws, store] = useChatDialog(chatId);

	

	return (
		<ul>
			{
				store.messages.map((value, index) => {
					return <li key={index}>{value.text}</li>;
				})
			}
		</ul>
	);
};

export default ChatDialog;