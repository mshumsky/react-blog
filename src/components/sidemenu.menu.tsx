import React from "react";

import {Popper, MenuList, MenuItem, ClickAwayListener} from "@material-ui/core";

export interface SidemenuMenuProps {
	anchorEl?: HTMLButtonElement | null;
	onClose: () => any;
}

const SidemenuMenu: React.FC<SidemenuMenuProps> = ({anchorEl, onClose}) => {

	const open = Boolean(anchorEl);
	return (
		<Popper open={open} anchorEl={anchorEl} transition disablePortal>
			<ClickAwayListener onClickAway={onClose}>
				<MenuList autoFocusItem={open} id="Sidemenu-MenuList">
					<MenuItem>Настройки</MenuItem>
					<MenuItem>Выйти</MenuItem>
				</MenuList>
			</ClickAwayListener>
		</Popper>
	);
};

export default SidemenuMenu;