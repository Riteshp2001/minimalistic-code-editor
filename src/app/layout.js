import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Minimalistic Front-End Code Editor",
	description: "A powerful and user-friendly code editor for front-end development.",
	author: "Ritesh Dhirendra Pandit",
	keywords: ["code editor", "front-end development", "web development", "code", "editor"],
	version: "1.0.0",
	repository: "https://github.com/Riteshp2001/minimalistic-code-editor.git",
	license: "MIT License",
	homepage: "https://minimalistic-code-editor.vercel.app/",
	social: {
		portfolio: "https://riteshpandit.vercel.app/",
		linkedin: "https://www.linkedin.com/in/ritesh-kumar-43b349200",
		github: "https://github.com/Riteshp2001",
	},
	supportEmail: "riteshpandit2001@gmail.com",
	technologiesUsed: [
		"React",
		"Next.js",
		"CodeMirror",
		"CSS",
		"JavaScript",
		"Tailwind CSS",
		"PostCSS",
		"Prettier",
		"ESLint",
		"Babel",
		"Webpack",
		"Jest",
		"React Testing Library",
		"GitHub Actions",
		"Vercel",
	],
	features: ["Syntax highlighting", "Autocompletion", "Themes support", "Version control integration"],
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<Head>
				<Link rel="shortcut icon" href="/code-editor.png" sizes="128x128" type="image/x-icon" />
			</Head>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
