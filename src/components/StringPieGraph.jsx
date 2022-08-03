import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts"

export default function StringPieGraph(props) {
	if (!props.data) return

	const { data01, data02 } = props.data

	const colorsIn = ["#0088FE", "#00C49F"]
	const colorsOut = ["#FFBB28", "#FF8042"]

	return (
		<>
			<h2 className={"mb-0"}>{props.name}</h2>
			<ResponsiveContainer width={"100%"} height={340}>
				<PieChart>
					<Pie
						data={data02}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						innerRadius={104}
						outerRadius={110}
						label={{
							position: "top",
							fontSize: 18,
							fontWeight: "bold",
							dx: -10,
							dy: 10,
						}}
					>
						{data02.map((_item, i) => (
							<Cell key={`cell-${i}`} fill={colorsOut[i]} />
						))}
					</Pie>
					<Pie
						data={data01}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						innerRadius={25}
						outerRadius={105}
						label
					>
						{data01.map((_item, i) => (
							<Cell key={`cell-${i}`} fill={colorsIn[i % colorsIn.length]} />
						))}
					</Pie>

					<Tooltip />
					<Legend />
				</PieChart>
			</ResponsiveContainer>
		</>
	)
}
