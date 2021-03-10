import {Dispatch} from "redux";
import {cloneObject, isValid} from "../../utils/index";

/* Types */

export interface LoginState {
	open: boolean;
};

export enum LoginActionTypes {
	open = "LOGIN_OPEN",
	close = "LOGIN_CLOSE",
	trigger = "LOGIN_TRIGGER"
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

export type LoginAction = LoginOpenAction | LoginCloseAction | LoginTriggerAction;

/* Reducer */

const initState: LoginState = {
	open: false
};

export default (state = initState, action: LoginAction): LoginState => {
	switch (action.type) {
		case LoginActionTypes.open:
			return {...cloneObject(state), open: true};
		case LoginActionTypes.close:
			return {...cloneObject(state), open: false};
		case LoginActionTypes.trigger:
			return {...cloneObject(state), open: action.payload ? action.payload : !state.open};
		default:
			return state;
	}
};

/* Action creator */

export const open = () =>
	async (dispatch: Dispatch<LoginOpenAction>) => {
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