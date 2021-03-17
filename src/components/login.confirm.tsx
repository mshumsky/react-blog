import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core";
import React, {ChangeEvent, FC, useState} from "react";
import {useDispatch} from "react-redux";
import {RequestRegisterCodeResponse, validateRegisterCode} from "../api/index";
import {loginBusyAction, loginCloseAction, loginPendingAction, userChangeLoggedAction, userReplaceDataAction, useTypedSelector} from "../redux";
import {clearOtpRequest, storeAuthData} from "../services/index";

const LoginConfirm: FC<any> = () => {
	const store = useTypedSelector(store => store.login);
	const dispatch = useDispatch();

	const [code, setCode] = useState("");
	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
		setCode(e.target.value);

	const handleClose = () =>
		dispatch(loginCloseAction());

	const handleBack = () => {
		dispatch(loginPendingAction(false));
		clearOtpRequest();
	};

	const handleSubmit = () => {
		const validate = async () => {
			await dispatch(loginBusyAction(true));
			try {
				const pending = store.pending as RequestRegisterCodeResponse;
				const resp = await validateRegisterCode(pending.pk, code);
				storeAuthData(resp.data);
				dispatch(userChangeLoggedAction(true));
				clearOtpRequest();
				handleClose();
			} catch (err) {
				console.error("Response: ", err.response);
				console.error("Message: ", err.message);
			} finally {
				await dispatch(loginBusyAction(false));
			}
		};
		validate();
	};

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