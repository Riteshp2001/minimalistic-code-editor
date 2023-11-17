import React, { useContext, useMemo } from "react";
import monacoThemes, { defineTheme } from "./MonacoThemes";
import { FileContext } from "./CommonWindow";
import JSZip from "jszip";
import AddFile from "./AddFile";
import { Tooltip } from "@material-tailwind/react";

const ThemeSelector = ({ fileNames, setFileNames }) => {
	const { html, css, js, theme, setTheme } = useContext(FileContext);

	const handleExportButton = useMemo(() => {
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
			<Tooltip
				content="Export as ZIP"
				animate={{
					mount: { scale: 1, y: 0 },
					unmount: { scale: 0, y: 25 },
				}}
			>
				<button
					name="exportFile"
					onClick={handleExport}
					type="button"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
				>
					Export
				</button>
			</Tooltip>
		);
	}, [html, css, js]);

	const selectTheme = useMemo(() => {
		const handleThemeChange = (themeName) => {
			console.log("theme...", themeName);

			if (["light", "vs-dark"].includes(themeName)) {
				setTheme(themeName);
			} else {
				defineTheme(themeName).then((_) => setTheme(themeName));
			}
		};
		return (
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
						<option key={index} value={themeName} className=" hover:bg-gray-100 font-semibold">
							{themeName}
						</option>
					))}
				</optgroup>
			</select>
		);
	}, [setTheme, theme]);

	return (
		<div className="flex align-text-bottom py-2 justify-between">
			<span className=" flex">
				<label htmlFor="themes" className="underline text-xl font-medium text-gray-900 dark:text-white p-1">
					Select Theme :{" "}
				</label>
				{selectTheme}
			</span>
			<AddFile fileNames={fileNames} setFileNames={setFileNames} />
			<span>
				<label htmlFor="exportFile" className=" font-thin italic p-2">
					Want to Export files ?
				</label>
				{handleExportButton}
			</span>
		</div>
	);
};

export default ThemeSelector;
