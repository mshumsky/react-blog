import {AxiosResponse} from "axios";
import {UserProfile} from "../redux/reducers/user.reducer";
import {getAuthorizationHeader} from "../services";
import makeRequest from "./index";

type RequestMyProfileResponse = UserProfile;

export const requestMyProfile = (token?: string): Promise<AxiosResponse<RequestMyProfileResponse>> => makeRequest({
	url: "v1/accounts/me/",
	method: "get",
	headers: getAuthorizationHeader() || {Authorization: `Token ${token}`}
});

type UpdateProfileResponse = UserProfile;

export const updateProfile = (id: number, data: Partial<UserProfile>): Promise<AxiosResponse<UpdateProfileResponse>> => makeRequest({
	url: `v1/accounts/${id}/`,
	method: "put",
	headers: getAuthorizationHeader(),
	data
});