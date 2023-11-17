import React, { useState, createContext, useEffect, useContext } from "react";
import { defineTheme, html as monacoHtml, css as monacoCss, js as monacoJs } from "./MonacoThemes";
import ThemeSelector from "./ThemeSelector";
import _ from "lodash";
import SplittingWindow from "./SplittingWindow";

export const FileContext = createContext(null);

export default function CommonWindow({ fileNames, setFileNames }) {
	const [css, setCss] = useState(monacoCss);
	const [html, setHtml] = useState(monacoHtml);
	const [js, setJs] = useState(monacoJs);
	const [theme, setTheme] = useState("cobalt");

	useEffect(() => {
		defineTheme(theme).then((_) => setTheme((t) => t));

		const savedHtml = window.localStorage.getItem("html");
		const savedCss = window.localStorage.getItem("css");
		const savedJs = window.localStorage.getItem("js");
		if (savedHtml) {
			setHtml(() => savedHtml);
		}
		if (savedCss) {
			setCss(() => savedCss);
		}
		if (savedJs) {
			setJs(() => savedJs);
		}
	}, [theme]);

	useEffect(() => {
		window.localStorage.setItem("html", html);
		window.localStorage.setItem("css", css);
		window.localStorage.setItem("js", js);
		window.localStorage.setItem("files", fileNames);
	}, [html, css, js, fileNames]);

	return (
		<div className="p-2 rounded-lg shadow-lg w-full">
			<FileContext.Provider value={{ html, css, js, theme, setHtml, setCss, setJs, setTheme }}>
				<FilesViewer fileNames={fileNames} setFileNames={setFileNames} />
				<ThemeSelector fileNames={fileNames} setFileNames={setFileNames} />
				<SplittingWindow/>
			</FileContext.Provider>
		</div>
	);
}

function FilesViewer({ fileNames, setFileNames }) {
	const { setHtml, setCss, setJs, html } = useContext(FileContext);

	function setSelectedFile(fileId) {
		const selectedFile = fileNames.find((file) => file.id === fileId);
		if (selectedFile) {
			const updatedFiles = fileNames.map((file) => ({
				...file,
				isSelected: file.id === fileId ? true : false,
			}));

			setFileNames(updatedFiles);

			setHtml(selectedFile.content.html);
			setCss(selectedFile.content.css);
			setJs(selectedFile.content.js);
			console.log(html);
		}
	}

	function deleteSelectedFile(fileId) {
		const newFileNames = fileNames.filter((file) => file.id !== fileId);
		setFileNames(newFileNames);
	}

	return (
		<div className="relative  overflow-x-auto w-[95%] mx-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-white mb-4">
			<div className="flex p-3 mb-3 flex-row-reverse justify-end">
				{fileNames.map((file) => (
					<span
						key={file.id}
						className={`mx-2 p-2 flex items-center whitespace-nowrap rounded-xl shadow-lg transition duration-300 ease-in-out border-b-2 border-blue-400 transform hover:-translate-y-1 cursor-pointer ${
							file.isSelected
								? `scale-105 border-x-2 border-blue-300 bg-blue-700`
								: `hover:scale-105 hover:border-blue-300 hover:bg-blue-700`
						}  `}
					>
						<span
							onClick={() => setSelectedFile(file.id)}
							className="cursor-pointer transition-all duration-500 stroke-white text-center w-full inline-block hover:underline hover:underline-offset-4 hover:text-black "
						>
							{file.name}
						</span>
						<span className="px-2">|</span>
						<span onClick={() => deleteSelectedFile(file.id)} clas>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24px"
								height="24px"
								viewBox="0 0 24 24"
								className="inline cursor-pointer transition-all duration-500 hover:scale-110 z-10 stroke-white hover:stroke-black "
								fill="none"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24px"
									height="24px"
									viewBox="0 0 24 24"
									className="inline cursor-pointer"
									fill="none"
								>
									<path
										d="M20 14V7C20 5.34315 18.6569 4 17 4H12M20 14L13.5 20M20 14H15.5C14.3954 14 13.5 14.8954 13.5 16V20M13.5 20H7C5.34315 20 4 18.6569 4 17V12"
										// stroke="#fff"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M4 4L6.5 6.5M9 9L6.5 6.5M6.5 6.5L9 4M6.5 6.5L4 9"
										// stroke="#fff"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</svg>
						</span>
					</span>
				))}
			</div>
		</div>
	);
}
