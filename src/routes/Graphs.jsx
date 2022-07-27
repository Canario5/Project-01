import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"

export default function Graphs() {
	const data = [
		{ name: "Page A", uv: 400, pv: 2400, amt: 2400 },
		{ name: "Page B", uv: 210, pv: 1000, amt: 2400 },
		{ name: "Page c", uv: 325, pv: 2400, amt: 2400 },
	]
	return (
		<main style={{ padding: "1rem 0" }}>
			<h2>Graphs</h2>

			<LineChart
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
			</LineChart>
		</main>
	)
}
