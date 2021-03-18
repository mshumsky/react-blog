import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginModal from "./components/login.modal";
import SideMenu from "./components/sidemenu";
import Welcome from "./components/welcome";
import {store} from "./redux";
import "./styles.scss";


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
					<Route path="/article">
						<p>Article</p>
					</Route>
					<Route path="/chat">
						<p>Chat</p>
					</Route>
					<Route path="/notification">
						<p>Notification</p>
					</Route>
					<Route path="/" component={Welcome} />
				</Switch>
			</main>
		</div>
	);
}

export default App;

export const AppContainer: React.FC = () =>
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>;