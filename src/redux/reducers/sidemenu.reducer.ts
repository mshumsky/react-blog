import {Dispatch} from "redux";

/* Types */

export interface SidemenuState {
	open: boolean;
};

export enum SidemenuActionTypes {
	open = "SIDEMENU_OPEN",
	close = "SIDEMENU_CLOSE"
};

export interface SidemenuOpenAction {
	type: SidemenuActionTypes.open,
};

export interface SidemenuCloseAction {
	type: SidemenuActionTypes.close;
};

export type SidemenuAction = SidemenuOpenAction | SidemenuCloseAction;

/* Reducer */

const initState: SidemenuState = {
	open: false
};

export default (state = initState, action: SidemenuAction): SidemenuState => {
	switch (action.type) {
		case SidemenuActionTypes.open:
			return {...state, open: true};
		case SidemenuActionTypes.close:
			return {...state, open: false};
		default:
			return state;
	}
};

/* Action creator */

export const open = () =>
	async (dispatch: Dispatch<SidemenuOpenAction>) => {
		dispatch({type: SidemenuActionTypes.open});
	};

export const close = () =>
	async (dispatch: Dispatch<SidemenuCloseAction>) => {
		dispatch({type: SidemenuActionTypes.close});
	};