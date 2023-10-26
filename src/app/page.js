"use client";
import CommonWindow from "./Components/CommonWindow";
import Head from "./Head";

export default function Home() {
	return (
		<main>
			<Head />
			<div className="p-2 rounded-lg shadow-lg w-full">
				<CommonWindow />
			</div>
			<footer>
				<p className="text-center text-gray-500 pb-2">
					Build with <span className="text-pink-500">&hearts;</span> by{" "}
					<a
						href="https://riteshpandit.vercel.app/"
						target="_blank"
						className="text-blue-500 hover:text-blue-700 font-semibold italic"
					>
						Ritesh Pandit
					</a>
				</p>
			</footer>
		</main>
	);
}
