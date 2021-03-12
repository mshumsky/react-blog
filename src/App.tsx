import React from "react";

import {BrowserRouter, Switch, Route} from "react-router-dom";

import "./styles.scss";

import Welcome from "./components/welcome";
import LoginModal from "./components/login.modal";

function App() {

	const globalComp = [
		<LoginModal/>
	];

  return (
		<BrowserRouter>
			{globalComp}
			<Switch>
				<Route path="/" component={Welcome}/>
			</Switch>
		</BrowserRouter>
  );
}

export default App;
