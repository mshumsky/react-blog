import React from "react";

import {useTypedSelector} from "../redux";
import {Typography} from "@material-ui/core";

const Profile: React.FC = () => {
	const store = useTypedSelector(store => store.profile);




	return (
		<div className="Profile-Root">
			<Typography variant="h2">Профиль</Typography>
			<div className="Profile-Container">
				<div className="Profile-Main">
					Main
				</div>
				<div className="Profile-Info">
					Info
				</div>
			</div>
		</div>
	);
};

export default Profile;