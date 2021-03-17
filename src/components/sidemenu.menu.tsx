import React from "react";

import {Popper, Paper, MenuList, MenuItem, ClickAwayListener, Grow} from "@material-ui/core";
import {useLogged} from "../services/auth.service";
import {loginOpenAction, userLogoutAction} from "../redux";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";

export interface SidemenuMenuProps {
	anchorEl?: HTMLButtonElement | null;
	onClose: () => any;
}

const defaultOptions = [
	{
		label: "Войти",
		action: (dispatch: Dispatch<any>) => dispatch(loginOpenAction())
	}
];

const loggedOptions = [
	{
		label: "Выйти",
		action: (dispatch: Dispatch<any>) => dispatch(userLogoutAction())
	}
];

const SidemenuMenu: React.FC<SidemenuMenuProps> = ({anchorEl, onClose}) => {
	const open = Boolean(anchorEl);
	const logged = useLogged();
	const dispatch = useDispatch();

	return (
		<Popper className="sideMenu-Menu" open={open} anchorEl={anchorEl} placement="bottom-end" transition disablePortal>
			{
				({TransitionProps}) => (
					<Grow	{...TransitionProps} style={{transformOrigin: "right top"}}>
						<Paper>
							<ClickAwayListener onClickAway={onClose}>
								<MenuList autoFocusItem={open} id="Sidemenu-MenuList">
									{
										(logged ? loggedOptions : defaultOptions).map((option, index) => 
											<MenuItem onClick={() => option.action(dispatch)} key={index}>{option.label}</MenuItem>
										)
									}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)
			}
		</Popper>
	);
};

export default SidemenuMenu;