import React, { useContext } from "react";
import monacoThemes from "./MonacoThemes";
import { defineTheme } from "./MonacoThemes";
import { FileContext } from "./CommonWindow";
import JSZip from "jszip";

const ThemeSelector = ({ theme, setTheme }) => {
	const { html, css, js } = useContext(FileContext);

	const handleThemeChange = (themeName) => {
		console.log("theme...", themeName);

		if (["light", "vs-dark"].includes(themeName)) {
			setTheme(themeName);
		} else {
			defineTheme(themeName).then((_) => setTheme(themeName));
		}
	};

	const handleExport = () => {
		const zip = new JSZip();

		zip.file("index.html", html);
		zip.file("styles.css", css);
		zip.file("script.js", js);

		zip.generateAsync({ type: "blob" }).then(function (blob) {
			const a = document.createElement("a");
			a.href = URL.createObjectURL(blob);
			a.download = "minimilistic_code.zip";
			a.click();
		});
	};

	return (
		<div className="flex align-text-bottom py-2 justify-between">
			<span className=" flex">
				<label htmlFor="themes" className="underline text-xl font-medium text-gray-900 dark:text-white p-1">
					Select Theme :{" "}
				</label>
				<select
					title="Theme"
					name="themes"
					value={theme}
					onChange={(e) => handleThemeChange(e.target.value)}
					placeholder={`Select Theme`}
					className="bg-gray-50 border border-gray-300 font-semibold text-gray-900 text-sm rounded-lg focus:ring-blue-500 outline-none focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				>
					<optgroup label="Themes">
						{Object.keys(monacoThemes).map((themeName, index) => (
							<option key={index} value={themeName} className=" hover:bg-gray-100 font-semibold" >
								{themeName}
							</option>
						))}
					</optgroup>
				</select>
			</span>
			<span>
				<label htmlFor="exportFile" className=" font-thin italic p-2">
					Want to Export ?
				</label>
				<button
					name="exportFile"
					onClick={handleExport}
					type="button"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
				>
					Export
				</button>
			</span>
		</div>
	);
};

export default ThemeSelector;
