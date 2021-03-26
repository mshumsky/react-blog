import {Dispatch} from "redux";
import {UserProfile, UserProfileType} from "./user.reducer";
import {store} from "../index";
import {compareObjects} from "../../utils";

export interface ProfileState {
	editing: boolean;
	data: UserProfileType;
	changedData: Partial<UserProfile>;
}

export enum ProfileActionTypes {
	setEditing = "PROFILE_SETEDITING",
	setData = "PROFILE_SETDATA",
	setChangedData = "PROFILE_SETCHANGEDDATA"
}

export interface ProfileSetEditingAction {
	type: ProfileActionTypes.setEditing;
	payload: boolean;
}

export interface ProfileSetDataAction {
	type: ProfileActionTypes.setData;
	payload: UserProfileType;
}

export interface ProfileSetChangedDataAction {
	type: ProfileActionTypes.setChangedData;
	payload: Partial<UserProfile>;
}

export type ProfileAction = ProfileSetEditingAction | ProfileSetDataAction | ProfileSetChangedDataAction;

/* Reducer */

const initState: ProfileState = {
	editing: false,
	data: {},
	changedData: {}
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
		case ProfileActionTypes.setChangedData:
			return {
				...state,
				data: {...state.data, ...action.payload},
				changedData: {...state.changedData, ...action.payload}
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

export const setChangedData = (data: Partial<UserProfile>) =>
	async (dispatch: Dispatch<ProfileSetChangedDataAction>) => {
		const currentData = store.getState().profile.data;
		const changedData = compareObjects(currentData, data);
		dispatch({type: ProfileActionTypes.setChangedData, payload: changedData});
	};