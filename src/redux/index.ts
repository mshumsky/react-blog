import {TypedUseSelectorHook, useSelector} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

/* Reducers */

import userReducer, {UserState as _UserState} from "./reducers/user.reducer";
import loginReducer, {LoginState as _LoginState} from "./reducers/login.reducer";
import sidemenuReducer, {SidemenuState as _SidemenuState} from "./reducers/sidemenu.reducer";
import profileReducer, {ProfileState as _ProfileState} from "./reducers/profile.reducer";
import chatReducer, {ChatState as _ChatState} from "./reducers/chat.reducer";
import chatDialogReducer, {ChatDialogState as _ChatDialogState} from "./reducers/chatdialog.reducer";

const rootReducer = combineReducers({
	user: userReducer,
	login: loginReducer,
	sidemenu: sidemenuReducer,
	profile: profileReducer,
	chat: chatReducer,
	chatdialog: chatDialogReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

/* Actions */

export {
	LoginActionTypes,
	open as loginOpenAction, 
	close as loginCloseAction,
	busy as loginBusyAction,
	pending as loginPendingAction
} from "./reducers/login.reducer";
export type LoginState = _LoginState;

export {
	UserActionTypes,
	login as userLoginAction,
	logout as userLogoutAction,
	setProfile as userSetProfileAction
} from "./reducers/user.reducer";
export type UserState = _UserState;

export {
	SidemenuActionTypes,
	open as sidemenuOpenAction,
	close as sidemenuCloseAction
} from "./reducers/sidemenu.reducer";
export type SidemenuState = _SidemenuState;

export {
	ProfileActionTypes,
	setupUpdateTimer as profileSetupUpdateTimer,
	setData as profileSetDataAction,
	setChangedData as profileSetChangedDataAction
} from "./reducers/profile.reducer";
export type ProfileState = _ProfileState;

export {
	ChatActionTypes,
	fetchAll as chatFetchAllAction
} from "./reducers/chat.reducer"
export type ChatState = _ChatState;

export {
	ChatDialogActionTypes,
	addMessages as chatDialogAddMessagesAction
} from "./reducers/chatdialog.reducer";
export type ChatDialogState = _ChatDialogState;

/* Store */

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));