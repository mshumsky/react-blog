import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {chatFetchAllAction, useTypedSelector} from "../redux";
import {Switch, Route, useHistory} from "react-router-dom";
import ChatDialog from "./chat.dialog";

const Chat: React.FC = () => {
	const chat = useTypedSelector(store => store.chat);
	const dispatch = useDispatch();

	const history = useHistory();

	useEffect(() => {
		dispatch(chatFetchAllAction());	
	}, []);

	const gotoChat = (id: number) => history.push(`/chat/${id}`);

	return (
		<Switch>
			<Route path="/chat/:id" component={ChatDialog}/>
			<Route>
				<div className="Chat-Root">
					{chat.list.map((obj: any) => <p key={obj.id} onClick={(e) => gotoChat(obj.id)} style={{background: "red", cursor: "pointer"}}>Chat: {obj.id}</p>)}
				</div>
			</Route>
		</Switch>
	);
};

export default Chat;