import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core";
import React, {ChangeEvent, FC, useState} from "react";
import {useDispatch} from "react-redux";
import {loginCloseAction, loginPendingAction, useTypedSelector} from "../redux";

const LoginConfirm: FC<any> = () => {
	const store = useTypedSelector(store => store.login);
	const dispatch = useDispatch();

	const handleClose = () =>
		dispatch(loginCloseAction());

	const [code, setCode] = useState("");
	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
		setCode(e.target.value);


	const handleBack = () => {
		dispatch(loginPendingAction(false));
	};

	const handleSubmit = () => {
		console.log("SUBMITTED");
	}

	const open = store.open && store.pending !== false;
	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Подотверждение</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Введите код подтверждения
					<br />
					{code}
				</DialogContentText>
				<TextField name="otp" type="text" onChange={handleChange} />
			</DialogContent>
			<DialogActions>
				<button onClick={handleBack}>Ввести другой номер</button>
				<button onClick={handleSubmit}>Да</button>
				<button>Нет</button>
			</DialogActions>
		</Dialog>
	);
};

export default LoginConfirm;