import React, { useState, createContext, useEffect } from "react";
import Split from "react-split";
import TypingWindow from "./TypingWindow";
import OutputWindow from "./OutputWindow";
import { MAX_GUTTER_SIZE, defineTheme, html as monacoHtml, css as monacoCss, js as monacoJs } from "./MonacoThemes";
import ThemeSelector from "./ThemeSelector";
import _ from "lodash";

export const FileContext = createContext(null);

export default function CommonWindow() {
	const [css, setCss] = useState(monacoCss);
	const [html, setHtml] = useState(monacoHtml);
	const [js, setJs] = useState(monacoJs);
	const [theme, setTheme] = useState("Cobalt");

	useEffect(() => {
		const savedHtml = window.localStorage.getItem("html");
		const savedCss = window.localStorage.getItem("css");
		const savedJs = window.localStorage.getItem("js");
		if (savedHtml) {
			setHtml(savedHtml);
		}
		if (savedCss) {
			setCss(savedCss);
		}
		if (savedJs) {
			setJs(savedJs);
		}

		defineTheme("cobalt").then((_) =>
			setTheme((prevTheme) => {
				prevTheme = "Cobalt";
				return prevTheme;
			})
		);
	}, []);

	useEffect(() => {
		window.localStorage.setItem("html", html);
		window.localStorage.setItem("css", css);
		window.localStorage.setItem("js", js);
	}, [html, css, js]);

	return (
		<FileContext.Provider value={{ html, css, js, setHtml, setCss, setJs }}>
			<ThemeSelector theme={theme} setTheme={setTheme} />
			<Split
				sizes={[60, 75]}
				minSize={320}
				direction="horizontal"
				className="mainAreaWrapper"
			>
				<TypingWindow theme={theme} />
				<OutputWindow />
			</Split>
		</FileContext.Provider>
	);
}
