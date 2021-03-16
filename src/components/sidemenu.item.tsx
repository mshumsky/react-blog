import {ListItem, ListItemProps} from "@material-ui/core";
import {useRouteMatch, useHistory} from "react-router-dom";
import React from "react";

export interface SidemenuItemProps extends ListItemProps{
	path?: string;
	activeClassName?: string;
}

const SidemenuItem: React.FC<SidemenuItemProps> = (props) => {
	const match: boolean = Boolean(useRouteMatch(props.path ?? ""));
	const history = useHistory();

	const classes: Array<string> = props.className ? props.className.split(" ") : [];
	match &&
		classes.push(props.activeClassName ?? "");
	
	const liProps = {...props};
	delete liProps.path;
	delete liProps.activeClassName;
	liProps.className = classes.join(" ");

	liProps.onClick = e => {
		!match && props.path &&
			history.push(props.path);
		props.onClick && (props.onClick(e));
	};

	return React.cloneElement(<ListItem/>, liProps);
};

export default SidemenuItem;