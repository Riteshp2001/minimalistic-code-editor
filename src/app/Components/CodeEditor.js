import React, { useState } from "react";
import EditorWindow from "./EditorWindow";
import { html, css, js } from "./MonacoThemes";

const CodeEditor = ({ language, setCode, theme }) => {
  // const [value, setValue] = useState(
  // 	language === "html"
  // 		? "<!--//Some Comments</h1>-->"
  // 		: language === "css"
  // 		? "/* Some Comments */"
  // 		: "//Some Comments"
  // );
  const [value, setValue] = useState(
    language === "html" ? `${html}` : language === "css" ? `${css}` : `${js}`
  );

  const handleEditorChange = (newValue) => {
    setValue(newValue);
    setCode(newValue);
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      {language !== "" ? <BeautifyHeader language={language} /> : ""}
      <EditorWindow
        language={language}
        value={value}
        theme={theme}
        handleEditorChange={handleEditorChange}
      />
    </div>
  );
};

function BeautifyHeader({ language }) {
  return (
    <div className="flex justify-between items-center bg-gray-700 text-black px-2 ">
      <div className="flex items-center">
        <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
        <div className="h-3 w-3 bg-yellow-500 rounded-full mr-2"></div>
        <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
      </div>
      <h1 className="text-white font-extrabold text-2xl font-mono underline transition-all hover:text-shadow-lg hover:text-blue-500">
        {language}
      </h1>
    </div>
  );
}

export default CodeEditor;
