import React, {Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import LoginModal from "./components/login.modal";
import Welcome from "./components/welcome";
import "./styles.scss";

function App() {

	
	const globalComp = [
		<LoginModal key={0} />
	];

	return (
		<Fragment>
			{globalComp}
			<Switch>
				<Route path="/" component={Welcome} />
			</Switch>
		</Fragment>
	);
}

export default App;
