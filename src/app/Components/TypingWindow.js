import React, { useEffect, useMemo, useState, useContext } from "react";
import EditorWindow from "./EditorWindow";
import {
  html as EditorHtml,
  css as EditorCss,
  js as EditorJs,
} from "./MonacoThemes";
import { FileContext } from "./CommonWindow";

const TypingWindow = ({ language, code }) => {
  const [value, setValue] = useState(
    language === "html"
      ? `${EditorHtml}`
      : language === "css"
      ? `${EditorCss}`
      : `${EditorJs}`
  );

  const { setHtml, setCss, setJs } = useContext(FileContext);

  useEffect(() => {
    if (language === "html") {
      setHtml(() => value);
    } else if (language === "css") {
      setCss(() => value);
    } else {
      setJs(() => value);
    }
  }, [value, setHtml, setCss, setJs, language]);

  const handleEditorChange = _.debounce((newValue) => {
    setValue(newValue);
  }, 800);

  const languageDisplay = useMemo(() => {
    return (
      <div className="z-1 absolute text-xs font-bold bottom-0 right-0 bg-slate-200 text-black bg-opacity-50 p-2 mr-4 mb-2 rounded-md backdrop-blur-sm transition-all hover:text-shadow-lg hover:text-blue-900 pointer-events-auto cursor-default">
        {language}
      </div>
    );
  }, [language]);

  return (
    <div className="relative overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <EditorWindow
        language={language}
        value={code}
        handleEditorChange={handleEditorChange}
      />
      {languageDisplay}
    </div>
  );
};

export default TypingWindow;
