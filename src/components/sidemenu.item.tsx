import {ListItem, ListItemProps} from "@material-ui/core";
import {useRouteMatch, useHistory} from "react-router-dom";
import React from "react";

export interface SidemenuItemProps extends ListItemProps{
	path?: string;
}

const SidemenuItem: React.FC<SidemenuItemProps> = (props) => {
	const match: boolean = Boolean(useRouteMatch(props.path ?? ""));
	const history = useHistory();

	const classes: Array<string> = props.className ? props.className.split(" ") : ["sideMenu-ListItem"];
	match &&
		classes.push("sideMenu-Active");
	
	const liProps = {...props};
	delete liProps.path;
	liProps.className = classes.join(" ");

	liProps.onClick = e => {
		/* !match && */ props.path &&
			history.push(props.path);
		props.onClick && (props.onClick(e));
	};

	return React.cloneElement(<ListItem/>, liProps);
};

export default SidemenuItem;