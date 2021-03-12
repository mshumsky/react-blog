import React, {FC} from "react";

import {useSelector, useDispatch} from "react-redux";
import {LoginActionTypes} from "../redux/index";

const Welcome: FC<any> = () => {
	const dispatch = useDispatch();
	return (
		<div>
			<p>Главная страница</p>
			<button onClick={() => {
				dispatch({
					type: LoginActionTypes.open
				});
			}}>Авторизоваться</button>
		</div>
	)
};

export default Welcome;