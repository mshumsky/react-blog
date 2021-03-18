import {Divider, Drawer, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import {useDispatch} from "react-redux";
import {sidemenuCloseAction, sidemenuOpenAction, useTypedSelector} from "../redux/index";
import {useLogged} from "../services/index";


import AssignmentIcon from '@material-ui/icons/Assignment';
import ChatIcon from '@material-ui/icons/Chat';
import SidemenuProfile from "./sidemenu.profile";
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

import SidemenuItem from "./sidemenu.item";

const SideMenu: React.FC<any> = () => {
	const store = useTypedSelector(store => store.sidemenu);
	const dispatch = useDispatch();

	/*
		const logged: boolean = useLogged();
		if (!logged) return null;
	*/

	const onToggle = () => {
		dispatch(
			store.open === true ?
				sidemenuCloseAction() :
				sidemenuOpenAction()
		);
	};

	const open = store.open;

	const drawerClass = clsx({
		"sideMenu-Drawer": true,
		"sideMenu-Open": open,
		"sideMenu-Closed": !open
	});

	const paperClass = clsx({
		"sideMenu-Open": open,
		"sideMenu-Closed": !open
	});

	return (
		<Drawer variant="permanent" className={drawerClass} classes={{paper: paperClass}}>
			<List>
				<SidemenuProfile/>
				<SidemenuItem path="/article" button>
					<ListItemIcon>
						<AssignmentIcon/>
					</ListItemIcon>
					<ListItemText primary="Статьи" />
				</SidemenuItem>
				<SidemenuItem path="/chat" button>
					<ListItemIcon>
						<ChatIcon/>
					</ListItemIcon>
					<ListItemText primary="Чат"/>
				</SidemenuItem>
				<SidemenuItem path="/notification" button>
					<ListItemIcon>
						<NotificationsNoneIcon/>
					</ListItemIcon>
					<ListItemText primary="Уведомления"/>
				</SidemenuItem>
				<SidemenuItem button onClick={onToggle}>
					<ListItemIcon>
						<NotificationsNoneIcon/>
					</ListItemIcon>
				</SidemenuItem>
				
			</List>
		</Drawer>
	);
};

export default SideMenu;