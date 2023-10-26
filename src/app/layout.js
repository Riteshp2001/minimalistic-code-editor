import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Minimalistic Front-End Code Editor",
	description: "A powerful and user-friendly code editor for front-end development.",
	author: "Your Name",
	keywords: ["code editor", "front-end development", "web development", "code", "editor"],
	version: "1.0.0",
	repository: "https://github.com/yourusername/your-repo",
	license: "MIT License",
	homepage: "https://yourwebsite.com",
	social: {
		twitter: "@yourtwitter",
		linkedin: "https://www.linkedin.com/in/yourlinkedin",
		github: "https://github.com/yourgithub",
	},
	contributors: ["Contributor 1", "Contributor 2"],
	supportEmail: "riteshpandit2001@gmail.com",
	technologiesUsed: ["React", "Next.js", "CodeMirror", "CSS", "JavaScript"],
	features: ["Syntax highlighting", "Autocompletion", "Themes support", "Version control integration"],
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
