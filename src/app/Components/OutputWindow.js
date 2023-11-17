import React, { useContext, useRef, useEffect, useState, useMemo } from "react";
import { FileContext } from "./CommonWindow";
import Tooltip from "./Tooltip";

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
		const content = html + "<style>" + css + "</style>" + "<script>" + js + "</script";
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

	const iFrameSection = useMemo(() => {
		return (
			<iframe
				ref={iframeRef}
				title="Output"
				className="transition-height duration-250 bg-slate-50 text-black rounded-b-md w-full h-full"
				allowFullScreen={true}
			></iframe>
		);
	}, []);

	const fullScreenSection = useMemo(() => {
		const toggleFullscreen = () => {
			const iframe = iframeRef.current;
			if (iframe.requestFullscreen) {
				iframe.requestFullscreen().catch(() => {});
			}
		};

		return (
			<span
				className="z-2 absolute top-3 right-3 p-1 backdrop-blur-[1px] rounded-lg cursor-pointer"
				onClick={toggleFullscreen}
			>
				<Tooltip content="Full Screen">
					<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
						<path
							d="M86-86v-260h126v134h134v126H86Zm529 0v-126h133v-134h126v260H615ZM86-615v-259h260v126H212v133H86Zm662 0v-133H615v-126h259v259H748Z"
							fill="rgb(29,78,216)"
						/>
					</svg>
				</Tooltip>
			</span>
		);
	}, []);

	return (
		<div className="relative">
			{fullScreenSection}
			{iFrameSection}
		</div>
	);
}
