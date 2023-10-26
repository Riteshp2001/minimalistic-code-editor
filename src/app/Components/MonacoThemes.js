import { loader } from "@monaco-editor/react";

const MAX_GUTTER_SIZE = 7;

const monacoThemes = {
	active4d: "Active4D",
	"all-hallows-eve": "All Hallows Eve",
	amy: "Amy",
	"birds-of-paradise": "Birds of Paradise",
	blackboard: "Blackboard",
	"brilliance-black": "Brilliance Black",
	"brilliance-dull": "Brilliance Dull",
	"chrome-devtools": "Chrome DevTools",
	"clouds-midnight": "Clouds Midnight",
	clouds: "Clouds",
	cobalt: "Cobalt",
	dawn: "Dawn",
	dreamweaver: "Dreamweaver",
	eiffel: "Eiffel",
	"espresso-libre": "Espresso Libre",
	github: "GitHub",
	idle: "IDLE",
	katzenmilch: "Katzenmilch",
	"kuroir-theme": "Kuroir Theme",
	lazy: "LAZY",
	"magicwb--amiga-": "MagicWB (Amiga)",
	"merbivore-soft": "Merbivore Soft",
	merbivore: "Merbivore",
	"monokai-bright": "Monokai Bright",
	monokai: "Monokai",
	"night-owl": "Night Owl",
	"oceanic-next": "Oceanic Next",
	"pastels-on-dark": "Pastels on Dark",
	"slush-and-poppies": "Slush and Poppies",
	"solarized-dark": "Solarized-dark",
	"solarized-light": "Solarized-light",
	spacecadet: "SpaceCadet",
	sunburst: "Sunburst",
	"textmate--mac-classic-": "Textmate (Mac Classic)",
	"tomorrow-night-blue": "Tomorrow-Night-Blue",
	"tomorrow-night-bright": "Tomorrow-Night-Bright",
	"tomorrow-night-eighties": "Tomorrow-Night-Eighties",
	"tomorrow-night": "Tomorrow-Night",
	tomorrow: "Tomorrow",
	twilight: "Twilight",
	"upstream-sunburst": "Upstream Sunburst",
	"vibrant-ink": "Vibrant Ink",
	"xcode-default": "Xcode_default",
	zenburnesque: "Zenburnesque",
	iplastic: "iPlastic",
	idlefingers: "idleFingers",
	krtheme: "krTheme",
	monoindustrial: "monoindustrial",
};

export default monacoThemes;

const defineTheme = (theme) => {
	return new Promise((res) => {
		Promise.all([loader.init(), import(`monaco-themes/themes/${monacoThemes[theme]}.json`)]).then(
			([monaco, themeData]) => {
				monaco.editor.defineTheme(theme, themeData);
				res();
			}
		);
	});
};

const html = `
<!--//Some Comments-->

<div class="clock">
	<div class="clock-inner">
		<div class="numbers" contenteditable>
			<span class="hour" id="hour">9</span>
			<span>:</span>
			<span class="min" id="min">41</span>
		</div>
		<div><a class="name" href="https://codepen.io/scottkellum/pen/gOvXodv">-by Scott Kellum</a></div>
	</div>
	<div class="clock-overlay"></div>
</div>`;

const css = `
/* Some Comments */

html {
  font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif;
}

html,
body {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

::-moz-selection {
  background: #000;
  color: #858585;
}

::selection {
  background: #000;
  color: #858585;
}

.clock {
  font-size: 45vmin;
  line-height: 0.8;
  position: static;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-style: italic;
  font-weight: 1000;
  letter-spacing: -0.05em;
  font-variant-numeric: tabular-nums;
  overflow: hidden;
}

.clock-inner {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  place-content: center;
  background: repeating-radial-gradient(circle at -150% -25%, #fff, #777 0.025em, #fff 0.05em);
  filter: contrast(2000%);
}

.numbers {
  font-size: clamp(5rem,7rem,10rem);
  filter: blur(0.0125em);
  transform: rotate(6deg);
  opacity: 0.46;
}

.hour {
  transform: translatex(0.2em);
}

.min {
  transform: translatex(-0.2em);
}

.clock-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  mix-blend-mode: lighten;
  pointer-events: none;
  background: repeating-radial-gradient(circle at -150% -25% , #f7b232 0em, #f7b232 0.05em, #e12626 0.05em, #e12626 0.1em, #733d2c 0.1em, #733d2c 0.15em, #2b1d1d 0.15em, #2b1d1d 0.2em, #511c69 0.2em, #511c69 0.25em, #1c73c4 0.25em, #1c73c4 0.3em, #a0cdfb 0.3em, #a0cdfb 0.35em, #69d6ad 0.35em, #69d6ad 0.4em, #ffcd04 0.4em, #ffcd04 0.45em, #fbaaaa 0.45em, #fbaaaa 0.5em);
}

.name{
	position:absolute;
	letter-spacing:0;
	font-size:1rem;
	transform:translate(9em,4em);
	cursor:pointer;
}
`;

const js = `
//Some Comments

var time = new Date();

h = time.getHours();
m = time.getMinutes();

document.getElementById("hour").innerHTML = h;
document.getElementById("min").innerHTML = m;
`;

export { defineTheme, MAX_GUTTER_SIZE, html, css, js };
