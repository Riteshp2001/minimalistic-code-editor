import CodeEditor from "./CodeEditor";
import Split from "react-split";
import { useContext } from "react";
import { FileContext } from "./CommonWindow";
import { MAX_GUTTER_SIZE } from "./MonacoThemes";

export default function TypingWindow({ theme }) {
  const { setHtml, setCss, setJs } = useContext(FileContext);

  return (
    <Split
      direction="vertical"
      gutterSize={MAX_GUTTER_SIZE}
      sizes={[50, 25, 25]}
      className="wrapper"
    >
      <div className="bottomArea">
        <CodeEditor setCode={setHtml} language={"html"} theme={theme} />
      </div>
      <div className="bottomArea">
        <CodeEditor setCode={setCss} language={"css"} theme={theme} />
      </div>
      <div className="bottomArea">
        <CodeEditor setCode={setJs} language={"javascript"} theme={theme} />
      </div>
    </Split>
  );
}
