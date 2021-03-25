import React from "react";
import {useTypedSelector} from "../redux";
import {ApiImage} from "../redux/reducers/user.reducer";
import {Button} from "@material-ui/core";

import AddBoxIcon from "@material-ui/icons/AddBox";

const ProfileAvatarBox: React.FC = () => {
	const store = useTypedSelector(store => store.profile.data);
	const avatar = "avatar" in store ? store.avatar : {} as ApiImage;


	return (
		<div className="Profile-AvatarBox">
			<div className="Profile-AvatarBox__ImageBox">
				<img className="Profile-AvatarBox__Image" src={avatar?.full_size}/>
			</div>					
			<Button className="Profile-AvatarBox__UploadButton" startIcon={<AddBoxIcon/>}>
				Загрузить фотографию
			</Button>
		</div>
	);
};

export default ProfileAvatarBox;