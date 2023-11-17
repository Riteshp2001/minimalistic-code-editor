import TypingWindow from "./TypingWindow";
import Split from "react-split";
import { useContext } from "react";
import { FileContext } from "./CommonWindow";
import { MAX_GUTTER_SIZE } from "./MonacoThemes";

export default function TypingEditorWindow() {
  const { html, css, js } = useContext(FileContext);

  const bottomAreaCss =
    "h-[90vh] w-full flex flex-col flex-nowrap transition-width duration-250";

  return (
    <Split
      direction="vertical"
      gutterSize={MAX_GUTTER_SIZE}
      sizes={[50, 25, 25]}
      className="h-[90vh] w-full flex flex-col flex-nowrap transition-width duration-250"
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

    // <Split
    //   gutterSize={MAX_GUTTER_SIZE}
    //   sizes={[50, 25, 25]}
    //   className="w-full flex flex-nowrap transition-width duration-250"
    // >
    //   <div className={bottomAreaCss}>
    //     <TypingWindow setCode={setHtml} language={"html"} />
    //   </div>
    //   <div className={bottomAreaCss}>
    //     <TypingWindow setCode={setCss} language={"css"} />
    //   </div>
    //   <div className={bottomAreaCss}>
    //     <TypingWindow setCode={setJs} language={"javascript"} />
    //   </div>
    // </Split>

    //   <Split
    //   gutterSize={MAX_GUTTER_SIZE}
    //   dragInterval={1}
    //   sizes={[50, 25, 25]}
    //   className=" relative h-auto w-full flex flex-row flex-nowrap transition-width duration-250"
    // >
    //   <div className={bottomAreaCss}>
    //     <TypingWindow setCode={setHtml} language={"html"} />
    //   </div>
    //   <div className={bottomAreaCss}>
    //     <TypingWindow setCode={setCss} language={"css"} />
    //   </div>
    //   <div className={bottomAreaCss}>
    //     <TypingWindow setCode={setJs} language={"javascript"} />
    //   </div>
    // </Split>
  );
}
