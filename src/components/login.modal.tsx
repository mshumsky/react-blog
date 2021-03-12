import React, {ChangeEvent, MouseEvent, FC, useState} from "react";
import {useSelector, useDispatch} from "react-redux";

import {RootState, LoginState, loginOpenAction, loginBusyAction} from "../redux/index";

import {
	TextField,
	Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from "@material-ui/core";

const LoginModal: FC<any> = () => {
	const store: LoginState = useSelector((store: RootState) => store.login);
	const dispatch = useDispatch();

	const [phone, setPhone] = useState("");

	const handleClose = () =>
		dispatch(loginOpenAction());

	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
		setPhone(e.target.value);

	const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
		const register = async () => {

		};


	};

	return (
		<Dialog open={store.open} onClose={handleClose}>
			<DialogTitle>Авторизация</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Пожалуйста авторизируйтесь
					<br />
					{phone}
				</DialogContentText>
				<TextField name="phone_number" type="text" onChange={handleChange} />
			</DialogContent>
			<DialogActions>
				<button onClick={handleSubmit}>Да</button>
				<button>Нет</button>
			</DialogActions>
		</Dialog>
	);
};

export default LoginModal;