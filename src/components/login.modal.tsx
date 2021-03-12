import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core";
import React, {ChangeEvent, FC, MouseEvent, useState, Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {requestRegisterCode} from "../api/index";
import {loginBusyAction, loginCloseAction, loginRequestAction, LoginState, RootState} from "../redux/index";
import LoginConfirm from "./login.confirm";

const LoginModal: FC<any> = () => {
	const store: LoginState = useSelector((store: RootState) => store.login);
	const dispatch = useDispatch();

	const [phone, setPhone] = useState("");

	const handleClose = () =>
		dispatch(loginCloseAction());

	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
		setPhone(e.target.value);

	const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
		const register = async () => {
			await dispatch(loginBusyAction(true));
			try {
				const resp = await requestRegisterCode(phone);
				await dispatch(loginRequestAction(resp.data));
			} catch (err) {
				console.error("Response: ", err.response);
				console.error("Message: ", err.message);
			} finally {
				await dispatch(loginBusyAction(false));
			}
		};
		register();
	};

	const open = store.open && store.pending === false;

	return (
		<Fragment>
			<Dialog open={open} onClose={handleClose}>
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
					{store.busy && <button>Загрузка</button>}
					<button onClick={handleSubmit}>Да</button>
					<button>Нет</button>
				</DialogActions>
			</Dialog>
			<LoginConfirm/>
		</Fragment>
	);
};

export default LoginModal;