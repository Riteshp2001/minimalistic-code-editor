import React, { useContext } from "react";
import Editor from "@monaco-editor/react";
import { FileContext } from "./CommonWindow";

const EditorWindow = ({ language, value, handleEditorChange }) => {
	const { theme } = useContext(FileContext);
	return (
		<Editor
			height={`100vh`}
			width={`100%`}
			language={language}
			value={value}
			theme={theme}
			defaultValue="// some comment"
			onChange={handleEditorChange}
			options={{
				suggest: {
					showWords: true,
					showVariables: true,
					showFunctions: true,
					showClasses: true,
				},
				minimap: {
					enabled: true, // Show minimap
				},
				scrollbar: {
					vertical: "auto", // Show vertical scrollbar when needed
					horizontal: "auto", // Show horizontal scrollbar when needed
				},
				contextmenu: true, // Enable the context menu
				lineNumbers: "on", // Show line numbers on the left
				fontFamily: "Wotfard-regular,NerdFont, Helvetica, Arial, 'Monospace'", // Set the font family to a supported monospace font
				fontSize: 15, // Set the font size
				wordWrap: "on", // Enable word wrapping
				roundedSelection: true, // Round the corners of a selection
				automaticLayout: true, // Automatically resize the editor based on content
				readOnly: false, // Set the editor to read-only mode
				dragAndDrop: true, // Allow dragging and dropping of text
				cursorBlinking: "expand", // Set the cursor blinking style
				cursorSmoothCaretAnimation: "on", // Enable smooth caret animation
				smoothScrolling: true, // Enable smooth scrolling
				overviewRulerBorder: false, // Hide the border of the overview ruler
				lineDecorationsWidth: 16, // Set the width of line decorations (e.g., code lenses)
				renderWhitespace: "boundary", // Show whitespace characters only at boundaries
				renderControlCharacters: true, // Show control characters
				fontLigatures: true, // Enable ligatures
				formatOnType: true, // Enable formatting on type
				formatOnPaste: true, // Enable formatting on paste
				links: true, // Enable links
				hover: true, // Enable hover
				autoClosingComments: "always",
				autoClosingOvertype: "always",
				autoClosingDelete: "always",
				autoClosingBrackets: "always",
				autoClosingQuotes: "always",
				autoSurround: "languageDefined",
				autoIndent: "full",
				autoClosingPairs: [
					{
						open: "{",
						close: "}",
					},
					{
						open: "[",
						close: "]",
					},
					{
						open: "(",
						close: ")",
					},
					{
						open: '"',
						close: '"',
					},
					{
						open: "'",
						close: "'",
					},
				],
			}}
		/>
	);
};

export default EditorWindow;
