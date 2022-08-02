import {
	PieChart,
	Pie,
	Cell,
	BarChart,
	Legend,
	Bar,
	ResponsiveContainer,
	AreaChart,
	ReferenceLine,
	Area,
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
} from "recharts"

export default function StringPieGraph(props) {
	if (!props) return
	console.log(props)

	const { data01, data02 } = props.data

	const colorsIn = ["#0088FE", "#00C49F"]
	const colorsOut = ["#FFBB28", "#FF8042"]

	return (
		<>
			<h2 className={"mb-0"}>{props.name}</h2>
			<ResponsiveContainer width={"99%"} height={340}>
				<PieChart width={730} height={250}>
					<Pie
						data={data02}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						innerRadius={110}
						outerRadius={115}
						fill="#82ca9d"
						label
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
						outerRadius={110}
						fill="#82ca9d"
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
