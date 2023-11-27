import React, { useContext, useMemo } from "react";
import monacoThemes, { defineTheme } from "./MonacoThemes";
import { FileContext } from "./CommonWindow";
import JSZip from "jszip";
import AddFile from "./AddFile";
import Tooltip from "./Tooltip";
import addNotification from "./Notifications";

const ThemeSelector = ({ fileNames, setFileNames, currentFile }) => {
	const { html, css, js, theme, setTheme } = useContext(FileContext);

	const handleExportButton = useMemo(() => {
		const handleExport = () => {
			const zip = new JSZip();

			// Get the current date and time
			const now = new Date().toLocaleString();

			const metadata = `<!-- Exported on: ${now} -->\n`;

			zip.file(
				"index.html",
				`${metadata}\n\n<!-- Link to my website: https://riteshpandit.vercel.app -->\n\n${html}`
			);
			zip.file("styles.css", `${metadata}\n\n/* Styles for the magic */\n\n${css}`);
			zip.file("script.js", `${metadata}\n\n// JavaScript wizardry begins\n\n${js}`);

			// README content
			const readmeContent = `
# 🎉🌟 Welcome Fellow Coder! 🌟🎉

First of all thank you for using my Minimalistic Frontend Code Editor and exporting this website file. These files were exported on 27/11/2023, 20:25:25.<br> Added date display just for showing off my skills😛 (But wait is that even a skill 😶‍🌫️, zzzz...).

Feel the vibe of my creativity!😈

### 🚀 Quick Links:

-   [index.html](index.html): Check out your exported fancy website!
-   [styles.css](styles.css): The style behind your magic.
-   [script.js](script.js): Behold, your JavaScript wizardry!(Lemme tell you secret I know it's empty but you can add your own magic here 😎)

### ✨ Want to know more? 🌈🦄

Dive into my world at **_[riteshpandit.vercel.app](https://riteshpandit.vercel.app)_** for an immersive experience. Also you can connect with me on **_[LinkedIn](https://www.linkedin.com/in/ritesh-pandit-2001/)_** <br> wanna fork this **[repo](https://github.com/Riteshp2001/minimalistic-code-editor)**? Go ahead! I would love to see your creativity sorry in advance for any inconvineance sadly my code would be cluttered *(Beginner Mistakes )*😔.

-   Keep Rocking! 🚀🎸

### ``Just a reminder:``

> _Remember, even code needs 'breaks'—just not the infinite loop kind! Take timeouts, relish snacks, and debug life with a **smile** 😊_!

  `;

			zip.file("README.md", readmeContent);

			zip.generateAsync({ type: "blob" }).then(function (blob) {
				const a = document.createElement("a");
				a.href = URL.createObjectURL(blob);
				a.download = `${
					currentFile ? currentFile.name + "_" + currentFile.id : "minimilistic_code_" + crypto.randomUUID()
				}`;
				(".zip");
				a.click();
			});
			addNotification("Exported as ZIP", "Check downloads folder", "success");
		};

		return (
			<Tooltip content="Export as ZIP">
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
				className="bg-gray-50 border-b-2 border-blue-300 font-semibold text-gray-900 text-sm rounded-lg focus:ring-blue-500 outline-none focus:border-blue-500 block px-2 mx-2 dark:bg-[#2f2f2f] dark:h-10 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
