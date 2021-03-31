import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {chatFetchAllAction, useTypedSelector} from "../redux";

const Chat: React.FC = () => {
	const chat = useTypedSelector(store => store.chat);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(chatFetchAllAction());	
	}, []);

	return (
		<div className="Chat-Root">
			{chat.list.map((obj: any) => <p key={obj.id}>Chat: {obj.id}</p>)}
		</div>
	);
};

export default Chat;