import React from "react";

import {useTypedSelector} from "../redux";
import {Typography} from "@material-ui/core";

import ProfileAvatarBox from "./profile.avatarbox";
import ProfileInfoBox from "./profile.infobox";

const Profile: React.FC = () => {
	const store = useTypedSelector(store => store.profile);

	return (
		<div className="Profile-Root">
			<Typography variant="h2">Профиль</Typography>
			<div className="Profile-Container">
				<div className="Profile-Main">
					<ProfileAvatarBox/>
				</div>
				<div className="Profile-Secondary">
					<ProfileInfoBox/>
				</div>
			</div>
		</div>
	);
};

export default Profile;