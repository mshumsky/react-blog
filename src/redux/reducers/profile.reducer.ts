import {Dispatch} from "redux";
import {UserProfile, UserProfileType} from "./user.reducer";

export interface ProfileState {
	editing: boolean;
	data: UserProfileType;
}

export enum ProfileActionTypes {
	setEditing = "PROFILE_SETEDITING",
	setData = "PROFILE_SETDATA"
}

export interface ProfileSetEditingAction {
	type: ProfileActionTypes.setEditing;
	payload: boolean;
}

export interface ProfileSetDataAction {
	type: ProfileActionTypes.setData;
	payload: UserProfileType;
}

export type ProfileAction = ProfileSetEditingAction | ProfileSetDataAction;

/* Reducer */

const initState: ProfileState = {
	editing: false,
	data: {}
};

export default (state = initState, action: ProfileAction): ProfileState => {
	switch (action.type) {
		case ProfileActionTypes.setEditing:
			return {
				...state, 
				editing: action.payload
			};
		case ProfileActionTypes.setData:
			return {
				...state,
				data: action.payload
			};
		default:
			return state;
	}
};

/* Action creator */

export const setEditing = (value: boolean) => 
	async (dispatch: Dispatch<ProfileSetEditingAction>) => {
		dispatch({type: ProfileActionTypes.setEditing, payload: value});
	};

export const setData = (data: UserProfile) => 
	async (dispatch: Dispatch<ProfileSetDataAction>) => {
		dispatch({type: ProfileActionTypes.setData, payload: data});
	};