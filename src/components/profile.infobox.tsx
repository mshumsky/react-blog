import React from "react";

import {useTypedSelector} from "../redux";

const ProfileInfoBox: React.FC = () => {
	const store = useTypedSelector(store => store.profile.data);

	return (
		<div className="Profile-InfoBox">
			asd
		</div>
	);
};

export default ProfileInfoBox;