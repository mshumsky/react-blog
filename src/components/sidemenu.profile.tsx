import React from "react";

import {Avatar, ListItem, IconButton} from "@material-ui/core";

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

/* https://static.wikia.nocookie.net/discord-wikia/images/5/5e/Default.png/revision/latest?cb=20191215094354&path-prefix=ru */

const SidemenuProfile: React.FC = () => {


	return (
		<ListItem className="sideMenu-ListAvatar">
			<Avatar className="sideMenu-ListAvatar__Avatar"
				src="https://www.film.ru/sites/default/files/styles/epsa_400x450/public/articles/1451977-1173390.jpeg" />
			<div className="sideMenu-ListAvatar__FullName">
				<span className="sideMenu-ListAvatar__FullName__Name">Арнольд Schwarz</span>
				<IconButton size="small">
					<KeyboardArrowDownIcon/>
				</IconButton>
			</div>
		</ListItem>
	);
};

export default SidemenuProfile;