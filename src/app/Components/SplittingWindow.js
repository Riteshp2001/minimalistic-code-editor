import Split from "react-split";
import TypingEditorWindow from "./TypingEditorWindow";
import OutputWindow from "./OutputWindow";
import { MAX_GUTTER_SIZE } from "./MonacoThemes";
import { useState, useEffect, useContext } from "react";
import { FileContext } from "./CommonWindow";

export default function SplittingWindow({ fileNames, setFileNames }) {
  const [fileName, setFileName] = useState("");
  const { html, css, js } = useContext(FileContext);
  const [selectedFileId, setSelectedFileId] = useState(null);

  function handleFileNameChange(e) {
    setFileName(e.target.value);
  }

  // Function to sanitize the file name
  const sanitizeFileName = (name) => {
    const trimmedName = name.trim();
    const sanitizedName = trimmedName.replace(/\s+/g, "_") // Replaces spaces with underscores
    return sanitizedName === "" ? "file_editor" : sanitizedName;
  };

  const addFile = (e) => {
    e.preventDefault();
    const sanitizedFileName = sanitizeFileName(fileName);

    // Check if the sanitized file name already exists
    const isFileExists = fileNames.some(
      (file) => file.name === sanitizedFileName
    );

    if (isFileExists) {
      return;
    }

    const previouslySelected = fileNames.find((file) => file.isSelected);

    const newFile = {
      id: crypto.randomUUID(),
      name: sanitizedFileName,
      created: new Date().toDateString(),
      content: {
        html: html,
        css: css,
        js: js,
      },
      isSelected: true,
    };

    if (previouslySelected) {
      previouslySelected.isSelected = false;
    }

    setFileNames([...fileNames, newFile]);
    setFileName(sanitizeFileName)
  };

  // Automatically update the selected file every 3 minutes
  useEffect(() => {
    if (selectedFileId) {
      const interval = setInterval(() => {
        setFileNames((prevFiles) =>
          prevFiles.map((file) =>
            file.id === selectedFileId
              ? {
                  ...file,
                  content: {
                    html: html,
                    css: css,
                    js: js,
                  },
                }
              : file
          )
        );
      }, 180000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [html, css, js, selectedFileId, setFileNames]);

  return (
    <>
      <div className="relative bg-gray-700 text-white p-2 mb-1 rounded-lg ">
        <form onSubmit={addFile} className="flex justify-center items-center">
          <div className=" absolute flex left-3">
            <button
              type="button"
              className="flex justify-center items-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-3 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={addFile}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                className="fill-current transition-fill hover:text-blue-500 mx-1"
              >
                <path
                  d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"
                  fill="blue"
                />
              </svg>
              <span>New File</span>
            </button>
          </div>
          <div className="relative z-0 m-3 group">
            <input
              type="text"
              name="floating_filename"
              id="floating_email"
              className="block pt-3 px-2 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={fileName}
              onChange={handleFileNameChange}
              maxLength={35}
            />
            <label
              htmlFor="floating_filename"
              className="peer-focus:font-bold absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              File Name
            </label>
          </div>
        </form>
        <div className="absolute flex right-3">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30"
              viewBox="0 -960 960 960"
              width="30"
            >
              <path
                d="M217.309-132.001q-36.561 0-60.934-24.374-24.374-24.373-24.374-60.934v-525.382q0-36.561 24.374-60.934 24.373-24.374 60.934-24.374h525.382q36.561 0 60.934 24.374 24.374 24.373 24.374 60.934v525.382q0 36.561-24.374 60.934-24.373 24.374-60.934 24.374H217.309ZM630-210h120v-527.691q0-4.616-3.846-8.463-3.847-3.846-8.463-3.846H630v540Zm-77.999 0v-540H222.309q-4.616 0-8.463 3.846-3.846 3.847-3.846 8.463v515.382q0 4.616 3.846 8.463 3.847 3.846 8.463 3.846h329.692ZM630-210h120-120Z"
                fill="rgb(29,78,216)"
              />
            </svg>
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30"
              viewBox="0 -960 960 960"
              width="30"
            >
              <path
                d="M217.309-132.001q-36.561 0-60.934-24.374-24.374-24.373-24.374-60.934v-525.382q0-36.561 24.374-60.934 24.373-24.374 60.934-24.374h525.382q36.561 0 60.934 24.374 24.374 24.373 24.374 60.934v525.382q0 36.561-24.374 60.934-24.373 24.374-60.934 24.374H217.309ZM630-210h120v-527.691q0-4.616-3.846-8.463-3.847-3.846-8.463-3.846H630v540Zm-77.999 0v-540H222.309q-4.616 0-8.463 3.846-3.846 3.847-3.846 8.463v515.382q0 4.616 3.846 8.463 3.847 3.846 8.463 3.846h329.692ZM630-210h120-120Z"
                fill="rgb(29,78,216)"
              />
            </svg>
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30"
              viewBox="0 -960 960 960"
              width="30"
            >
              <path
                d="M217.309-132.001q-36.561 0-60.934-24.374-24.374-24.373-24.374-60.934v-525.382q0-36.561 24.374-60.934 24.373-24.374 60.934-24.374h525.382q36.561 0 60.934 24.374 24.374 24.373 24.374 60.934v525.382q0 36.561-24.374 60.934-24.373 24.374-60.934 24.374H217.309ZM630-210h120v-527.691q0-4.616-3.846-8.463-3.847-3.846-8.463-3.846H630v540Zm-77.999 0v-540H222.309q-4.616 0-8.463 3.846-3.846 3.847-3.846 8.463v515.382q0 4.616 3.846 8.463 3.847 3.846 8.463 3.846h329.692ZM630-210h120-120Z"
                fill="rgb(29,78,216)"
              />
            </svg>
          </span>
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
      {/* <Split
        gutterSize={MAX_GUTTER_SIZE}
        dragInterval={1}
        sizes={[70, 30]}
        minSize={[100, 300]}
        className="relative flex transition-height duration-250 w-full "
      >
        <TypingEditorWindow />
        <OutputWindow />
      </Split> */}
      {/* <Split
        gutterSize={MAX_GUTTER_SIZE}
        dragInterval={1}
        sizes={[70, 30]}
        minSize={200}
        direction="vertical"
        className="split transition-height duration-250"
      >
        <TypingEditorWindow />
        <OutputWindow />
      </Split> */}
    </>
  );
}
