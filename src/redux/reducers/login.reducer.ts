import {Dispatch} from "redux";
import {RequestRegisterCodeResponse} from "../../api/index";
import {clearOtpRequest, isLogged, restoreOtpRequest, storeOtpRequest} from "../../services/index";
import {isValid} from "../../utils/index";

/* Types */

export type LoginPending = RequestRegisterCodeResponse | false;

export interface LoginState {
	open: boolean;
	busy: boolean;
	pending: LoginPending;
};

export enum LoginActionTypes {
	open = "LOGIN_OPEN",
	close = "LOGIN_CLOSE",
	busy = "LOGIN_BUSY",
	pending = "LOGIN_PENDING"
};

export interface LoginOpenAction {
	type: LoginActionTypes.open,
};

export interface LoginCloseAction {
	type: LoginActionTypes.close;
};

export interface LoginBusyAction {
	type: LoginActionTypes.busy;
	payload: boolean;
}

export interface LoginPendingAction {
	type: LoginActionTypes.pending;
	payload: LoginPending;
}

export type LoginAction = LoginOpenAction | LoginCloseAction | LoginBusyAction | LoginPendingAction;

/* Reducer */

const initState: LoginState = {
	open: false,
	busy: false,
	pending: false
};

export default (state = initState, action: LoginAction): LoginState => {
	switch (action.type) {
		case LoginActionTypes.open:
			return {...state, open: true};
		case LoginActionTypes.close:
			return {...state, open: false};
		case LoginActionTypes.busy:
			return {...state, busy: action.payload};
		case LoginActionTypes.pending:
			return {...state, pending: action.payload};
		default:
			return state;
	}
};

/* Action creator */

export const open = () =>
	async (dispatch: Dispatch<LoginOpenAction | LoginPendingAction | LoginCloseAction>) => {
		if (isLogged()) {
			dispatch({type: LoginActionTypes.close});
			return;
		}
		const pendingRequest = restoreOtpRequest();
		pendingRequest !== null && (
			await pending(pendingRequest)(dispatch)
		);
		dispatch({type: LoginActionTypes.open});
	};

export const close = () =>
	async (dispatch: Dispatch<LoginCloseAction>) => {
		dispatch({type: LoginActionTypes.close});
	};

export const busy = (payload: boolean) =>
	async (dispatch: Dispatch<LoginBusyAction>) => {
		dispatch({type: LoginActionTypes.busy, payload});
	};

export const pending = (payload: LoginPending) =>
	async (dispatch: Dispatch<LoginPendingAction>) => {
		if (payload !== false)
			storeOtpRequest(payload);
		else clearOtpRequest();

		dispatch({type: LoginActionTypes.pending, payload});
	};