import {useState} from "react";
import {useDispatch} from "react-redux";
import {RequestRegisterCodeResponse, validateRegisterCodeResponse} from "../api";
import {store, userLoginAction, useTypedSelector} from "../redux";
import {UserData} from "../redux/reducers/user.reducer";
import {stringifyMatch} from "../utils";

/* Regular */

export const isLogged = (): boolean => Boolean(store.getState().user.logged);

/* storeAuthData */

export const storeAuthData = (data: UserData): void => localStorage.setItem("authData", JSON.stringify(data));
export const clearAuthData = (): void => localStorage.removeItem("authData");
export const restoreAuthData = (): validateRegisterCodeResponse | null => {
	const data = localStorage.getItem("authData");
	if (data === null) return null;
	return JSON.parse(data);
};

/* storeOtpRequest */

export const storeOtpRequest = (data: RequestRegisterCodeResponse): void => localStorage.setItem("pendingOTPRequest", JSON.stringify(data));
export const clearOtpRequest = (): void => localStorage.removeItem("pendingOTPRequest");
export const restoreOtpRequest = (): RequestRegisterCodeResponse | null => {
	const data = localStorage.getItem("pendingOTPRequest");
	if (data === null) return null;
	return JSON.parse(data);
};

/* getAuthorizationToken */

export const getAuthorizationToken = (): string | null => {
	if (isLogged())
		return (store.getState().user.data as UserData).token;
	const appData = restoreAuthData();
	return appData && appData.token;
};

/* getAuthorizationHeader */

interface GetAuthorizationHeaderReturn {
	Authorization: string;
}

type GetAuthorizationHeaderReturnType = GetAuthorizationHeaderReturn | null;

export const getAuthorizationHeader = (): GetAuthorizationHeaderReturnType => {
	const token = getAuthorizationToken();
	if (!token) return null;
	return {Authorization: `Token ${token}`};
};

/* Hooks */

export const useLogged = (): boolean => {
	const storeLogged = useTypedSelector(store => store.user.logged);
	const [logged, setLogged] = useState(storeLogged);

	if (logged !== storeLogged)
		setLogged(storeLogged);

	const dispatch = useDispatch();

	const authData = restoreAuthData();
	if (authData === null) return logged;

	const userStore = store.getState().user;

	if (!stringifyMatch(userStore.data, authData))
		dispatch(userLoginAction(authData));

	return logged;
};