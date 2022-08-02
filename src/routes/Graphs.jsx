import { useState, useEffect } from "react"

import localStorageFunctions from "../data/localStorageFunctions"
import StringPieGraph from "../components/StringPieGraph"

import {
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

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

export default function Graphs() {
	const { loadFromLocalStorage } = localStorageFunctions()
	let [resData, setResData] = useState()

	useEffect(() => {
		setResData(loadFromLocalStorage("LS_TextRazor_Temp"))
	}, [])

	if (!resData?.length > 0) return
	/* const data = [
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
	] */
	return (
		<main style={{ padding: "1rem 0" }}>
			{/* 	{console.log(data)} */}

			<Container fluid="md" className="my-3">
				<Row className="row-cols-1 row-cols-md-2">
					<Col>
						<StringPieGraph name={"Word stats"} data={textStats(resData, "wordStats")} />
					</Col>
					<hr className={"mt-4 mb-3 d-block d-md-none"} />
					<Col>
						<StringPieGraph
							name={"String stats"}
							data={textStats(resData, "stringStats")}
						/>
					</Col>
				</Row>
			</Container>

			{/* <Row>
				<Col>
					<ResponsiveContainer width="99%" height={400}>
						<BarChart data={data}>
							<CartesianGrid strokeDasharray="2 3" />

							<YAxis />
							<Tooltip />
							<Legend />
							<Bar dataKey="pv" fill="#8884d8" />
							<Bar dataKey="uv" fill="#82ca9d" />
						</BarChart>
					</ResponsiveContainer>
				</Col>
			</Row> */}

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

function textStats(resData, retFce) {
	const stringsCount = resData?.length ?? 0

	const mergedStrings = resData
		.map((item) => item.origText)
		.join(", ")
		.replace(/[^a-zA-Z\s]+/g, "")
		.replace(/\s\s+/g, " ")
		.split(" ")

	const entitiesCountPerString = resData.map((item) =>
		item.entities ? item.entities.length : 0
	)

	const stringsWithEntities = entitiesCountPerString.reduce(
		(acc, cur) => (cur ? acc + 1 : acc),
		0
	)

	const entitiesCount = entitiesCountPerString.reduce((acc, cur) => acc + cur, 0)

	function wordStats() {
		const a1 = new Data(
			"Words not identified as entity",
			mergedStrings.length - entitiesCount
		)
		const a2 = new Data("Entities detected", entitiesCount)

		const b = new Data("Words analyzed", mergedStrings.length)
		return { data01: [a1, a2], data02: [b] }
	}

	function stringStats() {
		const a1 = new Data("Texts without entity", stringsCount - stringsWithEntities)
		const a2 = new Data("Texts containing entity", stringsWithEntities)

		const b = new Data("Texts analyzed", stringsCount)
		return { data01: [a1, a2], data02: [b] }
	}

	function Data(name, value) {
		this.name = name
		this.value = value
	}

	if (retFce === "wordStats") return wordStats()
	if (retFce === "stringStats") return stringStats()

	return [wordStats, stringStats]
}
