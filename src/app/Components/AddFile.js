import { useState, useEffect, useContext } from "react";
import { FileContext } from "./CommonWindow";
import Tooltip from "./Tooltip";
import addNotification from "./Notifications";

let checkFilesOnce = false;

export default function AddFile({ fileNames, setFileNames }) {
	const [fileName, setFileName] = useState("");
	const { html, css, js } = useContext(FileContext);

	function handleFileNameChange(e) {
		setFileName(e.target.value);
	}

	// Function to sanitize the file name
	const sanitizeFileName = (name) => {
		const trimmedName = name.trim();
		const sanitizedName = trimmedName.replace(/\s+/g, "_"); // Replaces spaces with underscores
		return sanitizedName === "" ? "Daisy_Date" : sanitizedName;
	};

	const addFile = (e) => {
		e.preventDefault();
		const sanitizedFileName = sanitizeFileName(fileName);

		// Check if the sanitized file name already exists
		const isFileExists = fileNames.some((file) => file.name === sanitizedFileName);

		if (isFileExists) {
			return;
		}

		const previouslySelected = fileNames.find((file) => file.isSelected);

		const newFile = {
			id: crypto.randomUUID(),
			name: sanitizedFileName,
			created: new Date().toDateString(),
			content: {
				html: html,
				css: css,
				js: js,
			},
			isSelected: true,
		};

		if (previouslySelected) {
			previouslySelected.isSelected = false;
		}
		console.log(fileNames.length);

		setFileNames((prevFiles) => {
			const newFilesArray = [...prevFiles, newFile];
			return newFilesArray;
		});

		if (!checkFilesOnce && fileNames.length == 0) {
			addNotification(
				"Important Message",
				`Congratulations on adding your first file 🎉, Now when you have added file you can double click on the file to edit it's name as mnay times as you want ! \n Happy Coding ! ;)`,
				"info",
				10000
			);
			checkFilesOnce = true;
		}
		setFileName(sanitizeFileName);
		addNotification(`${sanitizedFileName}`, `File added successfully!`);
	};

	return (
		<div>
			<form onSubmit={addFile} className=" relative flex ">
				<div className="relative z-0 group">
					<input
						type="text"
						name="floating_filename"
						id="floating_email"
						className="block pt-3 px-2 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						value={fileName}
						onChange={handleFileNameChange}
						maxLength={35}
					/>

					<label
						htmlFor="floating_filename"
						className="peer-focus:font-bold absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>
						File Name
					</label>
				</div>
				<span className="absolute inset-y-0 right-0 flex items-center">
					<Tooltip content="Add as many files as you want no limit, files with witespaces will be replaced by '_'.">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
							className="h-5 w-5 cursor-pointer text-blue-gray-500"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
							/>
						</svg>
					</Tooltip>
				</span>
			</form>
		</div>
	);
}
