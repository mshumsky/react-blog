import {TypedUseSelectorHook, useSelector} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

/* Reducers */

import userReducer, {UserState as _UserState} from "./reducers/user.reducer";
import loginReducer, {LoginState as _LoginState} from "./reducers/login.reducer";

const rootReducer = combineReducers({
	user: userReducer,
	login: loginReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

/* Actions */

export {
	LoginActionTypes,
	open as loginOpenAction, 
	close as loginCloseAction, 
	trigger as loginTriggerAction,
	busy as loginBusyAction,
	pending as loginPendingAction,
	request as loginRequestAction
} from "./reducers/login.reducer";
export type LoginState = _LoginState;

export {
	UserActionTypes,
	changeLogged as userChangeLoggedAction,
	replaceProfile as userReplaceProfileAction,
	replaceData as userReplaceDataAction
} from "./reducers/user.reducer";
export type UserState = _UserState;

/* Store */

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));