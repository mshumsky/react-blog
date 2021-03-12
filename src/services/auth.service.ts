import {useState, useEffect} from "react";
import {RequestRegisterCodeResponse} from "../api/index";
import {store} from "../redux/index";

/* Regular */

export const isLogged = (): boolean => Boolean(store.getState().user.logged);

export const storeOtpRequest = (data: RequestRegisterCodeResponse): void => localStorage.setItem("pending_otp_request", JSON.stringify(data));
export const clearOtpRequest = (): void => localStorage.removeItem("pending_otp_request");
export const restoreOtpRequest = (): RequestRegisterCodeResponse | null => {
	const data = localStorage.getItem("pending_otp_request");
	if (data === null) return null;
	return JSON.parse(data);
}

/* Hooks */

export const useLogged = (): boolean => {
	const [logged, setLogged] = useState(isLogged());
	const listener = () => setLogged(isLogged());

	useEffect(() => {
		store.subscribe(listener);
	}, []);

	return logged;
};