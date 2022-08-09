export default function HighlightInsert(props) {
	return (
		<span
			className="highlight"
			title={`Entity: ${props?.entityId ?? props?.matchedText} \nType: ${
				props?.type?.join(", ") ?? "No type found"
			}`}
			id={props.id}
		>
			{props?.matchedText}
		</span>
	)
}
