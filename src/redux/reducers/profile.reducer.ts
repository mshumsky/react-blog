import {Dispatch} from "redux";
import {UserProfile, UserProfileType} from "./user.reducer";
import {store} from "../index";
import {compareObjects, isValid} from "../../utils";
import {updateProfile} from "../../api";

export interface ProfileState {
	updateTimer: number;
	data: UserProfileType;
	changedData: Partial<UserProfile>;
}

export enum ProfileActionTypes {
	clearUpdateTimer = "PROFILE_CLEARUPDATETIMER",
	setupUpdateTimer = "PROFILE_SETUPUPDATETIMER",
	setData = "PROFILE_SETDATA",
	setChangedData = "PROFILE_SETCHANGEDDATA"
}

export interface ProfileClearUpdateTimerAction {
	type: ProfileActionTypes.clearUpdateTimer;
}

export interface ProfileSetupUpdateTimerAction {
	type: ProfileActionTypes.setupUpdateTimer;
	payload: number
}

export interface ProfileSetDataAction {
	type: ProfileActionTypes.setData;
	payload: UserProfileType;
}

export interface ProfileSetChangedDataAction {
	type: ProfileActionTypes.setChangedData;
	payload: Partial<UserProfile>;
}

export type ProfileAction = ProfileClearUpdateTimerAction | ProfileSetupUpdateTimerAction | ProfileSetDataAction | ProfileSetChangedDataAction;

/* Reducer */

const initState: ProfileState = {
	updateTimer: 0,
	data: {},
	changedData: {}
};

export default (state = initState, action: ProfileAction): ProfileState => {
	switch (action.type) {
		case ProfileActionTypes.clearUpdateTimer:
			clearTimeout(state.updateTimer);
			return {
				...state,
				updateTimer: 0
			};
		case ProfileActionTypes.setupUpdateTimer:
			return {
				...state, 
				updateTimer: action.payload
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

export const setupUpdateTimer = () => 
	async (dispatch: Dispatch<ProfileSetupUpdateTimerAction | ProfileClearUpdateTimerAction>) => {
		dispatch({type: ProfileActionTypes.clearUpdateTimer});
		const timerId = setTimeout(async () => {
			const state = store.getState().profile;
			const profileId = (state.data as UserProfile).id;
			const changedData = state.changedData;
			try {
				const resp = await updateProfile(profileId, changedData);
				console.log(resp.data);
			} catch (err) {
				console.error("Failed in updating profile changes.");
			}
			dispatch({type: ProfileActionTypes.clearUpdateTimer});
		}, 1600);
		dispatch({type: ProfileActionTypes.setupUpdateTimer, payload: +timerId});
	};

export const setData = (data: UserProfile) => 
	async (dispatch: Dispatch<ProfileSetDataAction>) => {
		dispatch({type: ProfileActionTypes.setData, payload: data});
	};

export const setChangedData = (data: Partial<UserProfile>) =>
	async (dispatch: Dispatch<any>) => {
		const currentData = store.getState().profile.data;
		const changedData = compareObjects(currentData, data);
		dispatch({type: ProfileActionTypes.setChangedData, payload: changedData});
		dispatch(setupUpdateTimer());
	};