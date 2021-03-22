import {Dispatch} from "redux";
import {requestMyProfile} from "../../api";
import {clearAuthData, clearOtpRequest, storeAuthData} from "../../services";
import {ProfileActionTypes, ProfileSetDataAction} from "./profile.reducer";

/* Types */

export interface UserData {
	id: number;
	last_login: string | null;
	token: string;
}

export type UserDataType = UserData | {};

export interface ApiImage {
	full_size: string;
	medium_square_crop?: string;
}

export type ApiImageType = ApiImage | null;

export interface UserProfile {
	id: number;
	id_str: string;
	username: string;
	first_name: string;
	last_name: string;
	avatar: ApiImageType;
	status_type: number;
	status_type_str: string;
	account_url: string;
	background_color: string;
	city: string;
	phone_number: string;
	workplace: string;
	work_experience: string;
	about: string;
	set_avatar_url: string;
}

export type UserProfileType = UserProfile | {};

export interface UserState {
	logged: boolean;
	data: UserDataType;
	profile: UserProfileType;
}

export enum UserActionTypes {
	login = "USER_LOGIN",
	logout = "USER_LOGOUT",
	setProfile = "USER_SETPROFILE"
}

export interface UserLoginAction {
	type: UserActionTypes.login;
	payload: UserDataType;
}

export interface UserLogoutAction {
	type: UserActionTypes.logout;
}

export interface UserSetProfileAction {
	type: UserActionTypes.setProfile,
	payload: UserProfile;
}

export type UserAction = UserLoginAction | UserLogoutAction | UserSetProfileAction;

/* Reducer */

const initState: UserState = {
	logged: false,
	data: {},
	profile: {}
};

export default (state = initState, action: UserAction): UserState => {
	switch (action.type) {
		case UserActionTypes.login:
			return {
				...state, 
				logged: true,
				data: action.payload
			};
		case UserActionTypes.logout: 
			return initState;
		case UserActionTypes.setProfile:
			return {
				...state,
				profile: action.payload
			};
		default:
			return state;
	}
};

/* Action creator */

export const login = (data: UserData) => 
	async (dispatch: Dispatch<UserLoginAction | UserSetProfileAction | ProfileSetDataAction>) => {
		clearOtpRequest();
		storeAuthData(data);
		try {
			const resp = await requestMyProfile(data.token);
			dispatch({type: UserActionTypes.login, payload: data});
			dispatch({type: UserActionTypes.setProfile, payload: resp.data});
			dispatch({type: ProfileActionTypes.setData, payload: resp.data});
		} catch (err) {
			console.error(err);
		}
	}

export const logout = () => 
	async (dispatch: Dispatch<UserLogoutAction | ProfileSetDataAction>) => {
		clearAuthData();
		dispatch({type: UserActionTypes.logout});
		dispatch({type: ProfileActionTypes.setData, payload: {}});
	};

export const setProfile = (data: UserProfile) => 
	async (dispatch: Dispatch<UserSetProfileAction | ProfileSetDataAction>) => {
		dispatch({type: UserActionTypes.setProfile, payload: data});
		dispatch({type: ProfileActionTypes.setData, payload: data});
	};