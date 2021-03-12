import React, {FC} from "react";

import {useDispatch} from "react-redux";
import {loginOpenAction} from "../redux";

const Welcome: FC<any> = () => {
	const dispatch = useDispatch();
	return (
		<div>
			<p>Главная страница</p>
			<button onClick={() => {
				dispatch(loginOpenAction());
			}}>Авторизоваться</button>
		</div>
	)
};

export default Welcome;