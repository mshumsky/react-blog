import {Dispatch} from "redux";
import {RequestRegisterCodeResponse} from "../../api";
import {restoreOtpRequest, storeOtpRequest} from "../../services";
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
	trigger = "LOGIN_TRIGGER",
	busy = "LOGIN_BUSY",
	pending = "LOGIN_PENDING"
};

export interface LoginOpenAction {
	type: LoginActionTypes.open,
};

export interface LoginCloseAction {
	type: LoginActionTypes.close;
};

export interface LoginTriggerAction {
	type: LoginActionTypes.trigger;
	payload?: boolean;
};

export interface LoginBusyAction {
	type: LoginActionTypes.busy;
	payload: boolean;
}

export interface LoginPendingAction {
	type: LoginActionTypes.pending;
	payload: LoginPending;
}

export type LoginAction = LoginOpenAction | LoginCloseAction | LoginTriggerAction | LoginBusyAction | LoginPendingAction;

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
		case LoginActionTypes.trigger:
			return {...state, open: action.payload ? action.payload : !state.open};
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
	async (dispatch: Dispatch<LoginOpenAction | LoginPendingAction>) => {
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

export const trigger = (payload?: boolean) =>
	async (dispatch: Dispatch<LoginTriggerAction>) => {
		dispatch({type: LoginActionTypes.trigger, ...isValid(payload) && {payload}});
	};

export const busy = (payload: boolean) =>
	async (dispatch: Dispatch<LoginBusyAction>) => {
		dispatch({type: LoginActionTypes.busy, payload});
	};

export const request = (data: RequestRegisterCodeResponse) =>
	async (dispatch: Dispatch) => {
		storeOtpRequest(data);
		await pending(data)(dispatch);
	};

export const pending = (payload: LoginPending) =>
	async (dispatch: Dispatch<LoginPendingAction>) => {
		dispatch({type: LoginActionTypes.pending, payload});
	};