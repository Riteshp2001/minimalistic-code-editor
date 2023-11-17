"use client";
import { useMemo } from "react";
import CommonWindow from "./Components/CommonWindow";
import { useEffect, useState } from "react";
import { Tooltip } from "@material-tailwind/react";

export default function Home() {
	const [fileNames, setFileNames] = useState([]);

	// Load saved files from localStorage on initial render
	useEffect(() => {
		const savedFiles = localStorage.getItem("files");
		if (savedFiles) {
			try {
				const parsedFiles = JSON.parse(savedFiles);
				setFileNames(parsedFiles);
			} catch (error) {
				console.error("Error parsing files from localStorage:", error);
			}
		}
	}, []);

	// Update local storage when fileNames change
	useEffect(() => {
		localStorage.setItem("files", JSON.stringify(fileNames));
	}, [fileNames]);

	const FooterDescp = useMemo(() => {
		return <Footer />;
	}, []);

	const HeaderDescp = useMemo(() => {
		return <Head />;
	}, []);

	return (
		<main>
			{HeaderDescp}
			<div className="hidden lg:block lg:justify-center lg:items-center">
				<CommonWindow fileNames={fileNames} setFileNames={setFileNames} />
			</div>
			<div className="lg:hidden flex items-center justify-center h-screen">
				<div className="text-center">
					<p className="text-xl">Editor not available on mobile. Please open in desktop mode.</p>
				</div>
			</div>
			{FooterDescp}
		</main>
	);
}

function Head() {
	return (
		<div>
			<div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
			<a
				href="https://github.com/Riteshp2001/minimilistic-code-editor.git"
				title="Fork me on GitHub"
				className="githublink-corner"
				target="_blank"
			>
				<svg width="50" height="50" viewBox="0 0 250 250" className="relative z-20 h-20 w-20 text-white">
					<title>Fork me on GitHub</title>
					<path d="M0 0h250v250"></path>
					<path
						d="M127.4 110c-14.6-9.2-9.4-19.5-9.4-19.5 3-7 1.5-11 1.5-11-1-6.2 3-2 3-2 4 4.7 2 11 2 11-2.2 10.4 5 14.8 9 16.2"
						fill="currentColor"
						className="octo-arm"
					></path>
					<path
						d="M113.2 114.3s3.6 1.6 4.7.6l15-13.7c3-2.4 6-3 8.2-2.7-8-11.2-14-25 3-41 4.7-4.4 10.6-6.4 16.2-6.4.6-1.6 3.6-7.3 11.8-10.7 0 0 4.5 2.7 6.8 16.5 4.3 2.7 8.3 6 12 9.8 3.3 3.5 6.7 8 8.6 12.3 14 3 16.8 8 16.8 8-3.4 8-9.4 11-11.4 11 0 5.8-2.3 11-7.5 15.5-16.4 16-30 9-40 .2 0 3-1 7-5.2 11l-13.3 11c-1 1 .5 5.3.8 5z"
						fill="currentColor"
						className="octo-body"
					></path>
				</svg>
			</a>

			<h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-center mb-6 text-blue-700 p-5">
				Minimalistic Front-End Editor
			</h1>
			<hr />
		</div>
	);
}

function Footer() {
	return (
		<footer>
			<p className="text-center text-gray-500 pb-2">
				Build with <span className="text-pink-500">&hearts;</span> by{" "}
				<Tooltip
					animate={{
						mount: { scale: 1, y: 0 },
						unmount: { scale: 0, y: 25 },
					}}
					content="My Website i am proud of 😤."
					className="p-2"
				>
					<a
						href="https://riteshpandit.vercel.app/"
						target="_blank"
						className="text-blue-500 hover:text-blue-700 font-semibold italic"
					>
						Ritesh Pandit
					</a>
				</Tooltip>
			</p>
		</footer>
	);
}
