import React from "react";

import {useTypedSelector} from "../redux";

const Profile: React.FC = () => {
	const store = useTypedSelector(store => store.profile);

	

	return (
		<div>
			Profile
		</div>
	);
};

export default Profile;