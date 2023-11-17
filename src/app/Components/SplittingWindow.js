import Split from "react-split";
import TypingEditorWindow from "./TypingEditorWindow";
import OutputWindow from "./OutputWindow";
import { MAX_GUTTER_SIZE } from "./MonacoThemes";
import { useState, useEffect, useContext } from "react";
import { FileContext } from "./CommonWindow";

export default function SplittingWindow() {
	return (
		<>
			<div class="flex justify-between items-center bg-gray-700 text-black p-2 rounded-t-lg">
				<div class="flex items-center">
					<div class="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
					<div class="h-3 w-3 bg-yellow-500 rounded-full mr-2"></div>
					<div class="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
				</div>
			</div>

			<Split
				gutterSize={MAX_GUTTER_SIZE}
				dragInterval={1}
				sizes={[50, 50]}
				minSize={320}
				direction="horizontal"
				className="flex flex-row flex-nowrap transition-height duration-250 "
			>
				<TypingEditorWindow />
				<OutputWindow />
			</Split>
		</>
	);
}
