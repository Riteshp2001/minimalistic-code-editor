import Split from "react-split";
import TypingEditorWindow from "./TypingEditorWindow";
import OutputWindow from "./OutputWindow";
import { MAX_GUTTER_SIZE } from "./MonacoThemes";

export default function SplittingWindow({ fileNames, setFileNames }) {
	const selectedFile = fileNames.find((file) => file.isSelected);

	return (
		<>
			<div className="flex justify-between bg-gray-700 text-black p-2 rounded-t-lg">
				<div className="flex items-center">
					<div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
					<div className="h-3 w-3 bg-yellow-500 rounded-full mr-2"></div>
					<div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
				</div>
				{selectedFile && (
					<div className="relative text-[0.6rem] inline-block text-center text-white">
						Date Created: {selectedFile.created}
					</div>
				)}
			</div>

			<Split
				gutterSize={MAX_GUTTER_SIZE}
				dragInterval={1}
				sizes={[50, 50]}
				minSize={320}
				direction="horizontal"
				className="flex flex-row flex-nowrap transition-height duration-250 "
			>
				<TypingEditorWindow setFileNames={setFileNames} fileNames={fileNames} />
				<OutputWindow />
			</Split>
		</>
	);
}
