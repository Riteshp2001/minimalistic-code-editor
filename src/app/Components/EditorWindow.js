import React from "react";
import Editor from "@monaco-editor/react";

const EditorWindow = ({ language, value, theme, handleEditorChange }) => {
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
        languageFeatures: {
          diagnostics: true,
          documentFormatting: true,
          documentRangeFormatting: true,
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
        fontFamily: "Fira Code", // Set the font family
        fontSize: 15, // Set the font size
        wordWrap: "on", // Enable word wrapping
        automaticLayout: true, // Automatically resize the editor based on content
        readOnly: false, // Set the editor to read-only mode
        autoClosingBrackets: "always", // Automatically close brackets and quotes
        autoClosingQuotes: "always",
        autoIndent: "full", // Enable automatic indentation
        dragAndDrop: true, // Allow dragging and dropping of text
        cursorBlinking: "blink", // Set the cursor blinking style
        overviewRulerBorder: false, // Hide the border of the overview ruler
        lineDecorationsWidth: 16, // Set the width of line decorations (e.g., code lenses)
        renderWhitespace: "boundary", // Show whitespace characters only at boundaries
        renderControlCharacters: true, // Show control characters
      }}
    />
  );
};

export default EditorWindow;
