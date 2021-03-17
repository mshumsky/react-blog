import {Dispatch} from "redux";
import {loginPendingAction} from "..";
import {clearAuthData, clearOtpRequest} from "../../services";

/* Types */

export interface UserProfile {
	[key: string]: any;
}

export interface IUserData {
	id: number;
	last_login: string | null;
	token: string;
}

export type UserData = IUserData | {};

export interface UserState {
	logged: boolean;
	profile: UserProfile;
	data: UserData | {};
}

export enum UserActionTypes {
	changeLogged = "USER_CHANGE_LOGGED",
	replaceProfile = "USER_REPLACE_PROFILE",
	replaceData = "USER_REPLACE_DATA"
}

export interface UserChangeLoggedAction {
	type: UserActionTypes.changeLogged;
	payload: boolean;
}

export interface UserReplaceProfileAction {
	type: UserActionTypes.replaceProfile;
	payload: UserProfile;
}

export interface UserReplaceDataAction {
	type: UserActionTypes.replaceData;
	payload: UserData;
}

export type UserAction = UserChangeLoggedAction | UserReplaceProfileAction | UserReplaceDataAction;

/* Reducer */

const initState: UserState = {
	logged: false,
	profile: {},
	data: {}
};

export default (state = initState, action: UserAction): UserState => {
	switch (action.type) {
		case UserActionTypes.changeLogged:
			return {...state, logged: action.payload};
		case UserActionTypes.replaceProfile:
			return {...state, profile: action.payload};
		case UserActionTypes.replaceData:
			return {...state, data: action.payload};
		default:
			return state;
	}
};

/* Action creator */

export const changeLogged = (value: boolean) =>
	async (dispatch: Dispatch<UserChangeLoggedAction>) => {
		dispatch({type: UserActionTypes.changeLogged, payload: value});
	};

export const replaceProfile = (profile: UserProfile) =>
	async (dispatch: Dispatch<UserReplaceProfileAction>) => {
		dispatch({type: UserActionTypes.replaceProfile, payload: profile});
	};

export const replaceData = (data: UserData) =>
	async (dispatch: Dispatch<UserReplaceDataAction>) => {
		dispatch({type: UserActionTypes.replaceData, payload: data});
	};

export const logout = () => 
	async (dispatch: Dispatch<any>) => {
		clearAuthData();
		dispatch(changeLogged(false));
		dispatch(replaceProfile({}));
		dispatch(replaceData({}));
		dispatch(loginPendingAction(false));
	};