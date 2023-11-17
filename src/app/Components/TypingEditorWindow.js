import TypingWindow from "./TypingWindow";
import Split from "react-split";
import { useContext } from "react";
import { FileContext } from "./CommonWindow";
import { MAX_GUTTER_SIZE } from "./MonacoThemes";

export default function TypingEditorWindow() {
	const { html, css, js } = useContext(FileContext);

	const bottomAreaCss = "h-[90vh] w-full flex flex-col flex-nowrap transition-width duration-250";

	return (
		<Split
			direction="vertical"
			gutterSize={MAX_GUTTER_SIZE}
			sizes={[50, 25, 25]}
			className={bottomAreaCss}
		>
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
