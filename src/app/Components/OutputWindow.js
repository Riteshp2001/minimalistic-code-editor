import React, { useContext, useRef, useEffect } from "react";
import { FileContext } from "./CommonWindow";

export default function OutputWindow() {
  const iframeRef = useRef(null);
  const { html, css, js } = useContext(FileContext);

  useEffect(() => {
    const iframe = iframeRef.current;
    const iframeDocument = iframe.contentDocument;
    if (!iframeDocument) {
      console.error("iframe document is not available.");
      return;
    }
    const content =
      html + "<style>" + css + "</style>" + "<script>" + js + "</script>";
    if (content) {
      const fullContent = `
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>${js}</script>
          </body>
        </html>
      `;

      iframeDocument.open();
      iframeDocument.write(fullContent);
      iframeDocument.close();
    } else {
      iframeDocument.open();
      iframeDocument.write("<h1>No output to display.</h1>");
      iframeDocument.close();
    }
  }, [html, css, js]);

  return (
    <iframe
      ref={iframeRef}
      title="Output"
      className="sidebar bg-slate-50 text-black rounded-md"
      allowFullScreen={true}
    ></iframe>
  );
}
