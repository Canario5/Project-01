import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts"

export default function TypePieGraph(props) {
	if (!props.data) return

	const { data01 } = props.data

	const colorsOut = [
		"#93003a",
		"#cf3759",
		"#ca6d5f",
		"#c42484",
		"#fa0f9c",
		"#ed44b4",
		"#e65740",
		"#ffa600",
		"#ab87ff",
		"#bfacf1",
		"#ccc4df",
		"#ffbcaf",
		/* "#505050", */
	]

	return (
		<>
			<h2 className={"mb-0"}>{props.name}</h2>
			<ResponsiveContainer width={"100%"} height={420}>
				<PieChart>
					<Pie
						data={data01}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						innerRadius={0}
						outerRadius={120}
						fill="#82ca9d"
						label={{
							fontSize: 18,
							fontWeight: "bold",
						}}
					>
						{data01.map((_item, i) => (
							<Cell key={`cell-${i}`} fill={colorsOut[i]} />
						))}
					</Pie>

					<Tooltip />
					<Legend />
				</PieChart>
			</ResponsiveContainer>
		</>
	)
}
