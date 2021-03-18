import {act} from "@testing-library/react";
import React from "react";
import ReactDom from "react-dom";
import {AppContainer} from "./app";

test("Render without crashing", () => {
	const div = document.createElement("div");
	act(() => {
		ReactDom.render(
			React.createElement(AppContainer),
			div
		);
	});
	ReactDom.unmountComponentAtNode(div);
});