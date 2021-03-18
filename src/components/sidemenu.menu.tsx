import React from "react";

import {Popper, Paper, MenuList, MenuItem, ClickAwayListener, Grow} from "@material-ui/core";
import {useLogged} from "../services/auth.service";
import {loginOpenAction, userLogoutAction} from "../redux";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";
import {useHistory} from "react-router-dom";

export interface SidemenuMenuProps {
	anchorEl?: HTMLButtonElement | null;
	onClose: () => any;
}

export interface SidemenuOption {
	label: string;
	action: (dispatch: Dispatch<any>, history?: any) => any;
}

const defaultOptions: Array<SidemenuOption> = [
	{
		label: "Войти",
		action: (dispatch: Dispatch<any>) => 
			dispatch(loginOpenAction())
	}
];

const loggedOptions: Array<SidemenuOption> = [
	{
		label: "Профиль",
		action: (dispatch: Dispatch<any>, history: any) => 
			history.push("/profile")
	},
	{
		label: "Выйти",
		action: (dispatch: Dispatch<any>) => 
			dispatch(userLogoutAction())
	}
];

const SidemenuMenu: React.FC<SidemenuMenuProps> = ({anchorEl, onClose}) => {
	const open = Boolean(anchorEl);
	const logged = useLogged();
	const dispatch = useDispatch();

	const history = useHistory();

	return (
		<Popper className="sideMenu-Menu" open={open} anchorEl={anchorEl} placement="bottom-end" transition disablePortal>
			{
				({TransitionProps}) => (
					<Grow	{...TransitionProps} style={{transformOrigin: "right top"}}>
						<Paper>
							<ClickAwayListener onClickAway={onClose}>
								<MenuList autoFocusItem={open} id="Sidemenu-MenuList">
									{
										(logged ? loggedOptions : defaultOptions).map((option: SidemenuOption, index: number) => 
											<MenuItem onClick={() => option.action(dispatch, history)} key={index}>{option.label}</MenuItem>
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