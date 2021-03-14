import React, {Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import LoginModal from "./components/login.modal";
import Welcome from "./components/welcome";
import "./styles.scss";

import SideMenu from "./components/sidemenu";

function App() {
	const globalComp = [
		<LoginModal key={0} />,
		<SideMenu key={1} />
	];

	return (
		<div className="app">
			{globalComp}
			<main>
				<Switch>
					<Route path="/" component={Welcome} />
				</Switch>
			</main>
		</div>
	);
}

export default App;
