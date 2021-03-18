import {Dispatch} from "redux";
import {clearAuthData, clearOtpRequest, storeAuthData} from "../../services";

/* Types */

export interface UserData {
	id: number;
	last_login: string | null;
	token: string;
}

export type UserDataType = UserData | {};

export interface UserState {
	logged: boolean;
	data: UserDataType;
}

export enum UserActionTypes {
	login = "USER_LOGIN",
	logout = "USER_LOGOUT"
}

export interface UserLoginAction {
	type: UserActionTypes.login;
	data: UserDataType;
}

export interface UserLogoutAction {
	type: UserActionTypes.logout;
}

export type UserAction = UserLoginAction | UserLogoutAction;

/* Reducer */

const initState: UserState = {
	logged: false,
	data: {}
};

export default (state = initState, action: UserAction): UserState => {
	switch (action.type) {
		case UserActionTypes.login:
			return {
				...state, 
				logged: true,
				data: action.data
			};
		case UserActionTypes.logout: 
			return initState;
		default:
			return state;
	}
};

/* Action creator */

export const login = (data: UserData) => 
	async (dispatch: Dispatch<UserLoginAction>) => {
		clearOtpRequest();
		storeAuthData(data);
		dispatch({
			type: UserActionTypes.login, data
		});
	}

export const logout = () => 
	async (dispatch: Dispatch<UserLogoutAction>) => {
		clearAuthData();
		dispatch({type: UserActionTypes.logout});
	};