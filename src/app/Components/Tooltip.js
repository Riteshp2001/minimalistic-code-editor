export default function Tooltip({ content, children }) {
	return (
		<span className="z-999 group relative ">
			{children}
			<span className="absolute top-[-45px] -right-1 scale-0 transition-all rounded-lg bg-gray-800 p-2 whitespace-nowrap text-xs text-white group-hover:scale-100">
				{content}
			</span>
		</span>
	);
}
