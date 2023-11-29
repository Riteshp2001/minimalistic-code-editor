import TypingWindow from "./TypingWindow";
import Split from "react-split";
import { useContext, useEffect } from "react";
import { FileContext } from "./CommonWindow";
import { MAX_GUTTER_SIZE } from "./MonacoThemes";

export default function TypingEditorWindow({ fileNames, setFileNames }) {
	const { html, css, js } = useContext(FileContext);

	useEffect(() => {
		const selectedFile = fileNames.find((file) => file.isSelected);
		const newFile = {
			...selectedFile,
			content: {
				html,
				css,
				js,
			},
		};
		setFileNames((prevFiles) => {
			const updatedFiles = prevFiles.map((file) => {
				if (file.isSelected) {
					return newFile;
				} else return file;
			});
			return updatedFiles;
		});
	}, [html, css, js]);

	const bottomAreaCss = "h-[90vh] w-full flex flex-col flex-nowrap transition-width duration-250";

	return (
		<Split direction="vertical" gutterSize={MAX_GUTTER_SIZE} sizes={[50, 25, 25]} className={bottomAreaCss}>
			<div className={bottomAreaCss}>
				<TypingWindow code={html} language={"html"} />
			</div>
			<div className={bottomAreaCss}>
				<TypingWindow code={css} language={"css"} />
			</div>
			<div className={bottomAreaCss}>
				<TypingWindow code={js} language={"javascript"} />
			</div>
		</Split>
	);
}
