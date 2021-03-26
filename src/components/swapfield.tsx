import React, {useState, useEffect} from "react";
import {isValid} from "../utils";

interface SwapFieldProps {
	inactiveComp: any;
	activeComp: any;
}

const SwapField: React.FC<SwapFieldProps> = (props) => {
	const [active, setActive] = useState(false);

	useEffect(() => {
		
	}, [active]);

	const triggerState = () => setActive(!active);
	const createProps = (comp: any, effect: boolean) => ({
		...comp.props,
		onClick: effect === active ?
			(e: any) => {
				triggerState();
				isValid(comp.props.onClick) &&
					comp.props.onClick(e);
			}
			: comp.props.onClick
	});

	const unpackComp = (comp: any) => typeof comp === "function" ? comp(triggerState, active, setActive) : comp;

	const activeCompUnpack = unpackComp(props.activeComp);
	const activeComp = React.cloneElement(
		activeCompUnpack, 
		createProps(activeCompUnpack, true)
	);
	
	const inactiveCompUnpack = unpackComp(props.inactiveComp);
	const inactiveComp = React.cloneElement(
		inactiveCompUnpack, 
		createProps(inactiveCompUnpack, false)
	);

	return active ? activeComp : inactiveComp;
};

export default SwapField;