import {TypedUseSelectorHook, useSelector} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

/* Reducers */

import loginReducer, {LoginState as _LoginState} from "./reducers/login.reducer";

const rootReducer = combineReducers({
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
} from "./reducers/login.reducer";
export type LoginState = _LoginState;

/* Store */

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));