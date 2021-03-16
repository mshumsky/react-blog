import React, {useState} from "react";

import {Avatar, ListItem, IconButton, Box, Typography} from "@material-ui/core";

import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import SidemenuMenu from "./sidemenu.menu";

const SidemenuProfile: React.FC = () => {
	const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLButtonElement>(null);

	const handleMenuOpen: React.MouseEventHandler<HTMLButtonElement> = (e) => {
		setMenuAnchorEl(e.currentTarget);
	}

	const handleMenuClose = () => setMenuAnchorEl(null);

	return (
		<ListItem className="sideMenu-ListItem__Avatar">
			<Avatar src="https://www.film.ru/sites/default/files/styles/epsa_400x450/public/articles/1451977-1173390.jpeg" />
			<Box className="sideMenu-FullName">
				<Typography component="span">
					Henry Jabbawockiez
				</Typography>
				<IconButton size="small" onClick={handleMenuOpen}>
					{
						Boolean(menuAnchorEl) === true ?
							<KeyboardArrowUpIcon/> :
							<KeyboardArrowDownIcon/>
					}
				</IconButton>
				<SidemenuMenu anchorEl={menuAnchorEl} onClose={handleMenuClose}/>
			</Box>
		</ListItem>
	);
};

export default SidemenuProfile;