import {
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

import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

export default function Graphs() {
	/* const data = [
		{ name: "Page A", uv: 400, pv: 2400, amt: 2400 },
		{ name: "Page B", uv: 210, pv: 1000, amt: 2400 },
		{ name: "Page c", uv: 325, pv: 2400, amt: 2400 },
	] */

	const data = [
		{
			name: "Page A",
			uv: 4000,
			pv: 2400,
			amt: 2400,
		},
		{
			name: "Page B",
			uv: 3000,
			pv: 1398,
			amt: 2210,
		},
		{
			name: "Page C",
			uv: 2000,
			pv: 9800,
			amt: 2290,
		},
		{
			name: "Page D",
			uv: 2780,
			pv: 3908,
			amt: 2000,
		},
		{
			name: "Page E",
			uv: 1890,
			pv: 4800,
			amt: 2181,
		},
		{
			name: "Page F",
			uv: 2390,
			pv: 3800,
			amt: 2500,
		},
		{
			name: "Page G",
			uv: 3490,
			pv: 4300,
			amt: 2100,
		},
	]
	return (
		<main style={{ padding: "1rem 0" }}>
			<h2>Graphs</h2>
			{console.log(data)}

			<Row>
				<Col className={"w-100 h-100"}>
					<ResponsiveContainer width="99%" height={400}>
						<AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
							<XAxis dataKey="name" />
							<YAxis />
							<CartesianGrid strokeDasharray="3 3" />
							<Tooltip />
							<ReferenceLine x="Page C" stroke="green" label="Min PAGE" />
							<ReferenceLine y={4000} label="Max" stroke="red" strokeDasharray="3 3" />
							<Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
						</AreaChart>
					</ResponsiveContainer>
				</Col>
			</Row>

			{/* <LineChart
				width={660}
				height={300}
				data={data}
				margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
			>
				<Line type="monotone" dataKey="uv" stroke="#8884d8" />
				<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
			</LineChart> */}
		</main>
	)
}
